package main

//Import statements
import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"hash/fnv"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Make buisness Struct, initialize Gorm DB and error
var Bs []Buisness //not used
var db *gorm.DB
var err error
var login bool

func hash(s string) uint32 {
	h := fnv.New32a()
	h.Write([]byte(s))
	return h.Sum32()
}

// Buisness struct made into to a gorm model for DB schema
type Buisness struct {
	gorm.Model
	User        string `json:"uname"`
	Pass        uint32 `json:"pword"`
	Ident       int    `json:"id"`
	Image       string `json:"buisnessImages"`
	Tags        string `json:"buisnessTags"`
	Name        string `json:"buisnessName"`
	Address     string `json:"buisnessAddress"`
	Description string `json:"buisnessDescription"`
	Email       string `json:"buisnessEmail"`
}

func fill_defaults(bsn *Buisness) {

	// setting default values
	if bsn.User == "" {
		bsn.User = "Please provide a username (Something is wrong)"
	}
	if bsn.Email == "" {
		bsn.Email = "Please provide an email (Something is wrong)"
	}
	if bsn.Name == "" {
		bsn.Name = "A business name can be added in the registry page!"
	}
	if bsn.Address == "" {
		bsn.Address = "A business address can be added in the registry page!"
	}
	if bsn.Description == "" {
		bsn.Description = "A business description can be added in the registry page!"
	}
	if bsn.Tags == "" {
		bsn.Tags = "Business categories be added to in the registry page!"
	}
}

func queryStringGen(searchTerms []string, columnName string, inclMode string) (string, []interface{}) {
	var QArgs []interface{}
	var queryString string

	for i, term := range searchTerms {
		if i == 0 {
			queryString = columnName + " LIKE ? "
			QArgs = append(QArgs, "%"+term+"%")
		} else {
			queryString += inclMode + " " + columnName + " LIKE ? "
			QArgs = append(QArgs, "%"+term+"%")
		}
	}
	return queryString, QArgs
}

//Fill Defaults

// REST API:
func getAllBuisnesses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var BuisList []Buisness
	db.Find(&BuisList)
	json.NewEncoder(w).Encode(BuisList)
}

func getBuisness(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	//Filter by ID
	var targetBuis Buisness
	req, _ := strconv.Atoi(param["id"])
	db.Where("id = ?", req).First(&targetBuis)
	json.NewEncoder(w).Encode(targetBuis)
}

func queryByTags(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	type TagStruct struct {
		// Tag list contains the list of inputted tags
		TagList []string `json:"qtaglist"`

		//Inclusive is a string determining if the query by
		//MUST BE EITHER AND OR OR
		Inclusive string `json:"inclString"`
	}

	// Parsing Data containing TAG information

	param := mux.Vars(r)
	tagListStr := param["tags"]
	includeString := param["incl"]

	//Extract the qTagList from tagListString
	qTagList := strings.Split(tagListStr, ",")

	qryString, Qargs := queryStringGen(qTagList, "Tags", includeString)

	var BuisnessList []Buisness
	db.Where(qryString, Qargs...).Find(&BuisnessList)

	json.NewEncoder(w).Encode(BuisnessList)

}

func removeBuisness(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	//Filter by ID
	var targetBuis Buisness
	req, _ := strconv.Atoi(param["id"])
	db.Where("id = ?", req).Delete(&targetBuis)
	json.NewEncoder(w).Encode("User successfully deleted")
}

func createBuisness(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")

	type sampleBuisness struct {
		Name        string `json:"buisnessName"`
		Address     string `json:"buisnessAddress"`
		Images      string `json:"buisnessImages"`
		Description string `json:"buisnessDescription"`
	}

	var n_b Buisness

	//Attempting a struct transfer with the normal Buisness struct
	//var n_b Buisness
	//New decoder stores the body of the javascript information into the variable n_b
	_ = json.NewDecoder(r.Body).Decode(&n_b)

	//Add to database
	db.Create(&n_b)
	// "returns" the encoded n_b
	json.NewEncoder(w).Encode(n_b)
}

// Update Status can have 2 responses (successful and User_Not_Found)
func updateBuisness(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	//Filter by ID
	var targetBuis Buisness
	req, _ := param["user"]

	type updateStatus struct {
		Update_Status string `json:"update_status"`
	}

	type arrayCarrier struct {
		Name        string   `json:"buisnessName"`
		Address     string   `json:"buisnessAddress"`
		Description string   `json:"buisnessDescription"`
		ImageArray  []string `json:"buisnessImageNames"`
		TagArray    []string `json:"buisnessTags"`
	}

	var uStatus updateStatus
	var arryCarry arrayCarrier

	uStatus.Update_Status = "Successful"

	result := db.First(&targetBuis, "User = ?", req)

	if result.RowsAffected == 0 {
		uStatus.Update_Status = "User_Not_Found"
		json.NewEncoder(w).Encode(&uStatus)
		return
	} else {
		json.NewDecoder(r.Body).Decode(&arryCarry)

		targetBuis.Address = arryCarry.Address
		targetBuis.Description = arryCarry.Description
		targetBuis.Name = arryCarry.Name

		var imageString string = ""
		var tagString string = ""

		print(len(arryCarry.ImageArray))
		/*
			for i := 0; i < len(arryCarry.ImageArray); i++ {
				if i < (len(arryCarry.ImageArray) - 1) {
					print(arryCarry.TagArray[i])
					imageString += arryCarry.ImageArray[i] + ";"
				} else {
					imageString += arryCarry.ImageArray[i]
				}
			}
		*/

		for i := 0; i < len(arryCarry.TagArray); i++ {
			if i < (len(arryCarry.TagArray) - 1) {
				print(arryCarry.TagArray[i])
				tagString += arryCarry.TagArray[i] + ";"
			} else {
				tagString += arryCarry.TagArray[i]
			}
		}

		targetBuis.Image = imageString
		targetBuis.Tags = tagString
		db.Save(&targetBuis)
		json.NewEncoder(w).Encode(targetBuis)
		return
	}
}

// Shows the buisness page when entering a certain buisness //REPLACE WITH ANGULAR STUFF
func showBuisnessPage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if login == true {
		tmpl := template.Must(template.ParseFiles("secretPage.html"))

		param := mux.Vars(r)
		//Filter by ID
		var targetBuis Buisness
		req, _ := param["uname"]
		db.Where("User = ?", req).First(&targetBuis)
		w.Header().Set("content-type", "text/html")
		tmpl.Execute(w, targetBuis)
		//login = false //return to false so they cannot access other pages
	}
	if login != true {
		print("not logged in")
	}
}

/*
The output json can contain 3 states: Successful, Username_not_found,
incorrect_password
*/
func parseLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	type Login struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	type Status struct {
		LoginStatus string `json:"loginStatus"`
	}

	var logStruct Login
	_ = json.NewDecoder(r.Body).Decode(&logStruct)

	var usrInput string = logStruct.Username
	var passInput string = logStruct.Password

	var logStatus Status
	logStatus.LoginStatus = "Successful"

	//Check the database for the usrname and password
	var targetBuisness Buisness
	result := db.First(&targetBuisness, "User = ?", usrInput)

	if result.RowsAffected == 0 {
		logStatus.LoginStatus = "Username_Not_Found"
		json.NewEncoder(w).Encode(&logStatus)
		return
	} else {
		if hash(passInput) == targetBuisness.Pass {
			logStatus.LoginStatus = "Success"
			json.NewEncoder(w).Encode(&logStatus)
		} else {
			logStatus.LoginStatus = "Incorrect_Password"
			json.NewEncoder(w).Encode(&logStatus)
		}

		//return the status of the log file

	}
}

/*
  Registation Data can contain 4 states. Successful, Username is taken,
  email is already registered, and passwords does not match
*/

func parseRegistry(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	type Registration struct {
		Email           string `json:"email"`
		Username        string `json:"username"`
		Password        string `json:"password"`
		ConfirmPassword string `json:"confirmPassword"`
	}

	type Status struct {
		RegistrationState string `json:"Reg_State"`
	}
	//Initialize the status struct
	var reg_status Status
	reg_status.RegistrationState = "Successful"

	//Place the registration into the
	var new_register Registration
	_ = json.NewDecoder(r.Body).Decode(&new_register)

	//Unpack the variables of the new_register
	var in_email string = new_register.Email
	var in_username string = new_register.Username
	var in_password string = new_register.Password
	var in_ConfirmPass string = new_register.ConfirmPassword

	//perform the following tests

	//Confirm password and main passwords do not match
	if in_password != in_ConfirmPass {
		println(in_password)
		println(in_ConfirmPass)
		reg_status.RegistrationState = "Unmatched_Password"
		json.NewEncoder(w).Encode(reg_status)
		return
	}

	//Search if the Email already exists in the system
	var sampleBuisness Buisness
	result := db.First(&sampleBuisness, "Email = ?", in_email)
	if result.RowsAffected != 0 {
		reg_status.RegistrationState = "Email_Registered"
		json.NewEncoder(w).Encode(reg_status)
		return
	}

	//Search if the Username is already in use:
	result = db.First(&sampleBuisness, "User = ?", in_username)
	if result.RowsAffected != 0 {
		reg_status.RegistrationState = "Username_Taken"
		json.NewEncoder(w).Encode(reg_status)
		return
	}

	//
	if reg_status.RegistrationState == "Successful" {
		var new_Buisness Buisness
		fill_defaults(&new_Buisness)
		new_Buisness.User = in_username
		fmt.Println(in_password)
		fmt.Println(hash(in_password))
		new_Buisness.Pass = hash(in_password)
		new_Buisness.Email = in_email
		db.Create(&new_Buisness)
		err := os.Mkdir("imageStorage/"+in_username, os.ModePerm)
		if err != nil {
			println("Could not make userDirectory")
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(reg_status)
	}

}

func QueryByName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	req, _ := param["name"]
	var targetBuisness Buisness
	result := db.First(&targetBuisness, "Name = ?", req)

	type Fail struct {
		Status string `json:"status"`
	}

	if result.RowsAffected == 0 {
		var msg Fail
		msg.Status = "Failure"
		json.NewEncoder(w).Encode(&msg)
		return
	} else {
		json.NewEncoder(w).Encode(&targetBuisness)
		return
	}

}

func buildDB() {

	db, err = gorm.Open(sqlite.Open("BuisnessDB.db"), &gorm.Config{})
	if err != nil {
		panic("Connection to database failed!")
	}

	fmt.Println("Database started....")
	fmt.Println("Running ....")
	//Create the Buisness dataBase Schema
	db.AutoMigrate(&Buisness{})

	//Establish the router for the mux router
}

// Check if there are two files with identical names:

func postImages(w http.ResponseWriter, r *http.Request) {
	//Extract Username from the mux parameter
	param := mux.Vars(r)
	user, _ := param["user"]

	type imgUploadStatus struct {
		Status string `json:"ImgUploadStatus"`
	}

	var UploadStatus imgUploadStatus

	//Parse Input/dorm-data. (specifies limit of file upload size)
	r.ParseMultipartForm(10 << 20)

	//Extract the file from the form data
	i_file, handler, err := r.FormFile("business_img")
	if err != nil {
		fmt.Println("Error retreiving file from form-data")
		UploadStatus.Status = "Error retreiving file from form-data"
		fmt.Print(err)
		return
	}
	defer i_file.Close()

	var fileName string = handler.Filename

	fmt.Print("The FileName is: ", fileName)

	// Perform check for identically named images

	// Write temporary on our server
	var usrImgDir string = "imageStorage/" + user + "/" + fileName
	imgFile, err := os.Create(usrImgDir)
	if err != nil {
		fmt.Print("Error assigning directory to User")
		UploadStatus.Status = "Error assigning directory to User"
		return
	}
	defer imgFile.Close()

	//Read the file into bytes using ioutil
	fileBytes, err := ioutil.ReadAll(i_file)
	if err != nil {
		fmt.Printf("Error Reading file Data")
		UploadStatus.Status = "Error Reading file Data"
		fmt.Println(err)
		json.NewEncoder(w).Encode(UploadStatus)
		return
	}

	imgFile.Write(fileBytes)

	// return if successful (in json)
	// Assuming everything else went well:

	UploadStatus.Status = "Successful Upload"
	json.NewEncoder(w).Encode(UploadStatus)

}

func getImages(w http.ResponseWriter, r *http.Request) {
	// Extract user name from data:
	param := mux.Vars(r)
	user, _ := param["user"]

	//Initialize the Status Struct
	type imageGetStatus struct {
		UploadStatus string `json:"uploadStatus"`
	}

	type imageHolder struct {
		ImgName string `json:"name"`
		B64Code string `json:"encodedImg"`
	}

	type imageReturnObj struct {
		ImageMapList []imageHolder `json:"imageHolder"`
	}

	var imageStatus imageGetStatus
	var imageReturn imageReturnObj

	// Get the string for the image storage directory
	var imgDir string = "imageStorage/" + user

	files, err := ioutil.ReadDir(imgDir)
	if err != nil {
		fmt.Println("reading the image directory failed")
		imageStatus.UploadStatus = "Failed to read target Directory!"
		fmt.Println(err)
		json.NewEncoder(w).Encode(imageStatus)
		return

	}

	for _, file := range files {
		readFile, err := ioutil.ReadFile(file.Name())
		if err != nil {
			fmt.Println(("Error Reading file from memory"))
			imageStatus.UploadStatus = "Could not get image: " + file.Name()
			json.NewEncoder(w).Encode(imageStatus)
			return

		}
		//Convert image to base64
		var encodedMap string = base64.StdEncoding.EncodeToString(readFile)

		// Store the image name and b64 encoding in struct
		var imgKeyValPair imageHolder

		//Store the image name and b64 encoding into a single file
		imgKeyValPair.ImgName = file.Name()
		imgKeyValPair.B64Code = encodedMap

		//
		imageReturn.ImageMapList = append(imageReturn.ImageMapList, imgKeyValPair)

	}

	json.NewEncoder(w).Encode(imageReturn)

}

func main() {
	r := mux.NewRouter()
	//Establish the buisness database with gorm:
	buildDB()

	//Establish the router for the mux router

	//Build the routes

	r.HandleFunc("/api/login", parseLogin).Methods("POST")
	r.HandleFunc("/api/register", parseRegistry).Methods("POST")
	r.HandleFunc("/api/", getAllBuisnesses).Methods("GET")
	r.HandleFunc("/api/user/{uname}", showBuisnessPage).Methods("GET")
	r.HandleFunc("/api/Name={name}", QueryByName).Methods("GET")
	r.HandleFunc("/{id}", getBuisness).Methods("GET")
	r.HandleFunc("/api/test", createBuisness).Methods("POST")
	r.HandleFunc("/api/user={user}/", updateBuisness).Methods("PUT")
	r.HandleFunc("/api/{id}", removeBuisness).Methods("DELETE")
	r.HandleFunc("/api/tag={tags}/inclusive={incl}", queryByTags).Methods("GET")
	r.HandleFunc("/api/user={user}/images", postImages).Methods("POST")
	r.HandleFunc("/api/user={user}/images", getImages).Methods("GET")

	//r.PathPrefix("/").Handler(AngularHandler).Methods("GET")
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS()(r)))

}
