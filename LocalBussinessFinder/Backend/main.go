package main

//Import statements
import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"

	"database/sql/driver"

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

// Buisness struct made into to a gorm model for DB schema
type Buisness struct {
	gorm.Model
	User        string `json:"uname"`
	Pass        string `json:"pword"`
	Ident       int    `json:"id"`
	Image       string `json:"buisnessImages"`
	Name        string `json:"buisnessName"`
	Address     string `json:"buisnessAddress"`
	Description string `json:"buisnessDescription"`
	Email       string `json:"buisnessEmail"`
	Category    string `json:"buisnessTag"`
}

func (m *Buisness) Scan(dest interface{}) error {
	if str, ok := dest.(string); ok {
		return json.Unmarshal([]byte(str), &m.Image)
	}
	return err
}

func (m Buisness) Value() (driver.Value, error) {
	return json.Marshal(m.Image)
}

func fill_defaults(bsn *Buisness) {

	// setting default values
	if bsn.User == "" {
		bsn.User = "Please provide a username (Something is wrong)"
	}
	if bsn.Pass == "" {
		bsn.Pass = "Please provide a password (Something is wrong)"
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
	if bsn.Category == "" {
		bsn.Category = "Business categories be added to in the registry page!"
	}
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
		ImageArray []string `json:"buisnessImageNames"`
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
		json.NewDecoder(r.Body).Decode(&targetBuis)

		var imageString string = ""

		print(len(arryCarry.ImageArray))
		for i := 0; i < len(arryCarry.ImageArray); i++ {
			if i < (len(arryCarry.ImageArray) - 1) {
				imageString += arryCarry.ImageArray[i] + ";"
			} else {
				imageString += arryCarry.ImageArray[i]
			}
		}

		targetBuis.Image = imageString
		db.Save(&targetBuis)
		json.NewEncoder(w).Encode(&uStatus)
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
		if passInput == targetBuisness.Pass {
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
		new_Buisness.Pass = in_password
		new_Buisness.Email = in_email
		db.Create(&new_Buisness)
		json.NewEncoder(w).Encode(reg_status)
	}

}

func main() {
	r := mux.NewRouter()
	//Establish the buisness database with gorm:

	db, err = gorm.Open(sqlite.Open("BuisnessDB.db"), &gorm.Config{})
	if err != nil {
		panic("Connection to database failed!")
	}

	fmt.Println("Database started....")
	fmt.Println("Running ....")
	//Create the Buisness dataBase Schema
	db.AutoMigrate(&Buisness{})

	//Establish the router for the mux router

	//Build the routes

	r.HandleFunc("/api/login", parseLogin).Methods("POST")
	r.HandleFunc("/api/register", parseRegistry).Methods("POST")
	r.HandleFunc("/api/", getAllBuisnesses).Methods("GET")
	r.HandleFunc("/api/user/{uname}", showBuisnessPage).Methods("GET")
	r.HandleFunc("/{id}", getBuisness).Methods("GET")
	r.HandleFunc("/api/test", createBuisness).Methods("POST")
	r.HandleFunc("/api/user={user}/", updateBuisness).Methods("PUT")
	r.HandleFunc("/api/{id}", removeBuisness).Methods("DELETE")

	//r.PathPrefix("/").Handler(AngularHandler).Methods("GET")
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS()(r)))

}
