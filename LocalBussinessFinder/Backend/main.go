package main

//Import statements
import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
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
	Name        string `json:"name"`
	Address     string `json:"address"`
	Category    string `json:"cat"`
	Description string `json:"desc"`
}

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
	w.Header().Set("Content-Type", "application/json")
	var n_b Buisness
	//New decoder stores the body of the javascript information into the variable n_b
	_ = json.NewDecoder(r.Body).Decode(&n_b)
	//Add to database
	db.Create(&n_b)
	// "returns" the encoded n_b
	json.NewEncoder(w).Encode(n_b)
	w.WriteHeader(200)
	w.Write([]byte("Sucessfully added"))
}

func updateBuisness(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	//Filter by ID
	var targetBuis Buisness
	req, _ := strconv.Atoi(param["id"])
	db.Where("id = ?", req).First(&targetBuis)
	json.NewDecoder(r.Body).Decode(&targetBuis)
	db.Save(&targetBuis)
	json.NewEncoder(w).Encode(targetBuis)
}

// Querying the database for when provided with a name in the get request
func userQuery(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("index.html"))
	if r.Method == "GET" {
		tmpl.Execute(w, nil)
		return
	} else if r.Method == "POST" {
		err := r.ParseForm()
		if err != nil {
			fmt.Printf("Die")
			return
		}
		//store the username and password entered in the login form
		name := r.PostFormValue("userNameI")
		password := r.PostFormValue("pWord")

		//if found, store in sample business
		var sampleBuisness Buisness
		db.Where("User = ?", name).First(&sampleBuisness)

		if password == sampleBuisness.Pass {
			print("success!")
			login = true
			//http.Redirect(w, r, "/"+strconv.Itoa(int(sampleBuisness.ID)), http.StatusFound)
			http.Redirect(w, r, "/user/"+sampleBuisness.Name, http.StatusFound)
			return
		} else {
			print("Incorrect Password!")
			http.Redirect(w, r, "/login", http.StatusFound)
		}
	}
	tmpl.Execute(w, nil)
}

// allows the user to use a sign-up page to enter their information into the database
// can be changed if we want to just have a sign-up page with username and password
// then redirect to a page where they can set up their profile, would just have to do the
// username and password first then redirect to the new page and load the data in from there
// but it can be done with the same function just get confirmation they created user and pword.

func signUpPage(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("signup.html"))
	if r.Method == "GET" {
		tmpl.Execute(w, nil)
		return
	} else if r.Method == "POST" {
		err := r.ParseForm()
		if err != nil {
			fmt.Printf("Die")
			return
		}

		//get all info from signup page
		name := r.PostFormValue("userNameI")
		password := r.PostFormValue("pWord")
		// used to double check password, if password and passwordTest
		// do not match, must redo login
		passwordTest := r.PostFormValue("pWordTest")
		busName := r.PostFormValue("busName")
		address := r.PostFormValue("address")
		busCat := r.PostFormValue("busCat")
		desc := r.PostFormValue("busDesc")

		//make sure passwords match (otherwise have to redo)
		if password == passwordTest {
			print("passwords match")
		} else {
			print("password does not match")
			http.Redirect(w, r, "/signup", http.StatusFound)
			return
		}
		//create new business struct with given information
		newBus := Buisness{
			User: name,
			Pass: password,
			//Ident:       00, // unsure if we need this since GORM includes their own ID that we can find using busName
			Name:        busName,
			Address:     address,
			Category:    busCat,
			Description: desc,
		}
		//add the new business created in sign in to the database
		_ = json.NewDecoder(r.Body).Decode(&newBus)
		//Add to database
		db.Create(&newBus)

		//redirect to business page, directing there from business name
		//will be:  "localhost:3000/{businessName}:
		login = true
		http.Redirect(w, r, "/user/"+newBus.Name, http.StatusFound)
		return
	}
	tmpl.Execute(w, nil)
}

// post -> frontend calls post request it creates a new business struct with
// username and password, reroutes to sign up page
func newAccount(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var t Buisness
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}
	log.Println(t.User)
	log.Println(t.Pass)
}

// put -> sign up page adds a put where the user can update the rest
// of the variables in the business struct
func signUpPage_(w http.ResponseWriter, r *http.Request) {
	/*
	   	    decoder := json.NewDecoder(r.Body)
	   	  	var t Buisness
	   	  	err := decoder.Decode(&t)
	   	  	if err != nil {
	   	  		panic(err)
	   	  	}
	   	  	log.Println(t.Name)

	     testJson := {}
	     var result map[string]any
	     json.Unmarshal([]byte(testJson), &result)

	     newBusi:= result["Name"].
	*/
	jsonFile, err := os.Open("signup.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Sucessfully opened signup.json")
	//defer cloing of json File so we can parse later
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	err_ := json.Unmarshal([]byte(byteValue), &result)
	if err_ != nil {
		return
	}

	fmt.Println(result["User"])

}

func login_(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var t Buisness
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}
	log.Println(t.Name)
	log.Println(t.Pass)
}

// Shows the buisness page when entering a certain buisness
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

func initDB() {
	//r := mux.NewRouter()
	//Establish the buisness database with gorm:

	db, err = gorm.Open(sqlite.Open("BuisnessDB.db"), &gorm.Config{})
	if err != nil {
		panic("Connection to database failed!")
	}
	//fmt.Println("Database started....")
	//fmt.Println("Running ....")
	//Create the Buisness dataBase Schema
	db.AutoMigrate(&Buisness{})
}
func main() {

	//Establish the router for the mux router
	r := mux.NewRouter()
	//Build the routes
	initDB()
	r.HandleFunc("/login", userQuery)
	r.HandleFunc("/signup", signUpPage) //might need to change from /signup to a different directory later on, just used for testing now
	r.HandleFunc("/", getAllBuisnesses).Methods("GET")
	r.HandleFunc("/user/{uname}", showBuisnessPage).Methods("GET")
	r.HandleFunc("/{id}", getBuisness).Methods("GET")
	r.HandleFunc("/", createBuisness).Methods("POST")
	r.HandleFunc("/{id}", updateBuisness).Methods("PUT")
	r.HandleFunc("/{id}", removeBuisness).Methods("DELETE")
	r.HandleFunc("/user/{uname}", signUpPage_).Methods("PUT") // method to handle front end sign up page
	r.HandleFunc("/signup", newAccount).Methods("POST")
	r.HandleFunc("/login", login_).Methods("POST")
	log.Fatal(http.ListenAndServe(":3000", r))

}
