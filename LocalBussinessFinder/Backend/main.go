package main

//Import statements
import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"html/template"
	"log"
	"net/http"
	"strconv"
)

// Make buisness Struct, initialize Gorm DB and error
var Bs []Buisness
var db *gorm.DB
var err error

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
		name := r.PostFormValue("userNameI")
		password := r.PostFormValue("pWord")

		var sampleBuisness Buisness
		db.Where("User = ?", name).First(&sampleBuisness)

		if password == sampleBuisness.Pass {
			print("success!")
			http.Redirect(w, r, "/"+strconv.Itoa(int(sampleBuisness.ID)), http.StatusFound)
			return
		} else {
			print("Incorrect Password!")
		}
	}
	tmpl.Execute(w, nil)
}

// Shows the buisness page when entering a certain buisness
func showBuisnessPage(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	tmpl := template.Must(template.ParseFiles("secretPage.html"))

	param := mux.Vars(r)
	//Filter by ID
	var targetBuis Buisness
	req, _ := param["uname"]
	db.Where("User = ?", req).First(&targetBuis)
	w.Header().Set("content-type", "text/html")
	tmpl.Execute(w, targetBuis)
}

func main() {
	r := mux.NewRouter()
	//Establish the buisness database with gorm:

	db, err = gorm.Open(sqlite.Open("BuisnessDB.db"), &gorm.Config{})
	if err != nil {
		panic("Connection to database failed!")
	}
	//Create the Buisness dataBase Schema
	db.AutoMigrate(&Buisness{})

	//Establish the router for the mux router

	//Build the routes

	r.HandleFunc("/login", userQuery)
	r.HandleFunc("/", getAllBuisnesses).Methods("GET")
	r.HandleFunc("/{uname}", showBuisnessPage).Methods("GET")
	r.HandleFunc("/{id}", getBuisness).Methods("GET")
	r.HandleFunc("/", createBuisness).Methods("POST")
	r.HandleFunc("/{id}", updateBuisness).Methods("PUT")
	r.HandleFunc("/{id}", removeBuisness).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":3000", r))

}
