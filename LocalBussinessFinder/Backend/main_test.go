package main

/*
  To run these test cases, navigate to the backend folder and use "go test -v" to run all test cases
  or, "go test -v -run <name of testing function>" to run individual tests within the main_test.go file
*/
/*
This file "main_test.go is ran to test the http handler methods :
  - GET
  - POST
  - DELETE
  - PUT
Also, needed to refactor main.go to allow for an initDB() function, just moved the mux router definition to its
own function then called in main.

Each test case handles each handler method similarly,
  - first, start the database
  - then, define what the method is going to request (handler method)
      - and the path of that request, ie. "/id" or just "/"
  - then start a new recorder for httptest that can check the status
  - define which function from main it is calling in the 'http.HandlerFunc()'
  - use handler.ServeHTTP(rr, req) to have it write to the recorder
  - check if status code is as expected.
*/

//imports needed for testing
import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetAllBusinesses(t *testing.T) {
	initDB()
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllBuisnesses)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	var response []Buisness

	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("got invalid response, expected list of buisnesses, got: %v", rr.Body.String())
	}

	if len(response) < 1 {
		t.Errorf("expected at least 1 job, got %v", len(response))
	}
}

func TestGetBusiness(t *testing.T) {
	initDB()
	req, err := http.NewRequest("GET", "/8", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllBuisnesses)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	var response []Buisness

	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("got invalid response, expected list of buisnesses, got: %v", rr.Body.String())
	}

	if len(response) < 1 {
		t.Errorf("expected at least 1 job, got %v", len(response))
	}
}

// testing to make sure we do not get a fatal error when trying to get a business that doesn't exist
// instead, it just doesnt return anything
func TestGetBusinessNonExistent(t *testing.T) {
	initDB()
	req, err := http.NewRequest("GET", "/100", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllBuisnesses)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	var response []Buisness

	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("got invalid response, expected list of buisnesses, got: %v", rr.Body.String())
	}

	if len(response) < 1 {
		t.Errorf("expected at least 1 job, got %v", len(response))
	}
}

func TestCreateBusiness(t *testing.T) {
	initDB()
	var jsonStr = []byte(`{"uname": "test", "pword":"test", "id":0, "name":"test", "address":"123", "cat": "test", "desc" = "test"}`)

	req, err := http.NewRequest("POST", "/", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createBuisness)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestUpdateBusiness(t *testing.T) {
	initDB()
	var jsonStr = []byte(`{"uname": "test"}`)

	req, err := http.NewRequest("PUT", "/8", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(createBuisness)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestRemoveBusiness(t *testing.T) {
	initDB()
	req, err := http.NewRequest("DELETE", "/12", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(removeBuisness)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("hander returned wrong status code: got %v, wanted %v",
			status, http.StatusOK)
	}
}

// making sure we do not get fatal error when something tries to access non existent businesses
func TestRemoveBusinessNonExistent(t *testing.T) {
	initDB()
	req, err := http.NewRequest("DELETE", "/100", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(removeBuisness)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("hander returned wrong status code: got %v, wanted %v",
			status, http.StatusOK)
	}
}

/*
	r.HandleFunc("/", getAllBuisnesses).Methods("GET")                  -> being tested
	r.HandleFunc("/{id}", getBuisness).Methods("GET")                   -> being tested
  r.HandleFunc("/", createBuisness).Methods("POST")                   -> being tested
	r.HandleFunc("/{id}", updateBuisness).Methods("PUT")                -> not tested yet
	r.HandleFunc("/{id}", removeBuisness).Methods("DELETE")             -> not tested yet
	r.HandleFunc("/{id}", updateBuisness).Methods("PUT")                -> not tested yet
--------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------
	r.HandleFunc("/user/{uname}", signUpPage_).Methods("PUT")           -> not going to test
	r.HandleFunc("/user/{uname}", showBuisnessPage).Methods("GET")      -> not going to test
	r.HandleFunc("/signup", newAccount).Methods("POST")                 -> not going to test
	r.HandleFunc("/login", login_).Methods("POST")                      -> not going to test
*/
