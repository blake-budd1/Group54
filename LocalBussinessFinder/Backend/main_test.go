package main

/*
  To run these test cases, navigate to the backend folder and use "go test -v" to run all test cases
  or, "go test -v -run <name of testing function>" to run individual tests within the main_test.go file
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
// instead, it just doesn't return anything
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
	r.HandleFunc("/", getAllBusinesses).Methods("GET")                  -> being tested
	r.HandleFunc("/{id}", getBusiness).Methods("GET")                   -> being tested
  r.HandleFunc("/", createBusiness).Methods("POST")                   -> being tested
	r.HandleFunc("/{id}", updateBusiness).Methods("PUT")                -> being tested
	r.HandleFunc("/{id}", removeBusiness).Methods("DELETE")             -> being tested
	r.HandleFunc("/{id}", updateBusiness).Methods("PUT")                -> being tested
  r.HandleFunc("/{id}", updateBusiness).Methods("PUT) -> with non existent profile -> being tested
	r.HandleFunc("/{id}", removeBusiness).Methods("DELETE") -> with non existent profile -> being tested
--------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------
	r.HandleFunc("/user/{uname}", signUpPage_).Methods("PUT")           -> not going to test
	r.HandleFunc("/user/{uname}", showBusinessPage).Methods("GET")      -> not going to test
	r.HandleFunc("/signup", newAccount).Methods("POST")                 -> not going to test
	r.HandleFunc("/login", login_).Methods("POST")                      -> not going to test
*/
