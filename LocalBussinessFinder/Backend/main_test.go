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
	req, err := http.NewRequest("GET", "/api/", nil)
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

	req, err := http.NewRequest("POST", "/api/test", bytes.NewBuffer(jsonStr))
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

	req, err := http.NewRequest("PUT", "/api/user=8", bytes.NewBuffer(jsonStr))
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
  -- SPRINT 3 FUNCTIONS: --
  r.HandleFunc("/api/login", parseLogin).Methods("POST")                        --> good
                                         with bad username                      --> good
                                         with bad password                      --> good
                                         with correct uname and pword           --> good

	r.HandleFunc("/api/register", parseRegistry).Methods("POST")                  --> good
                                        with valid registry                     --> good
                                        with invalid email                      --> good
                                        with invalid uname                      --> good
                                        with invalid pword                      --> good
	r.HandleFunc("/api/", getAllBuisnesses).Methods("GET")                        --> good
  r.HandleFunc("/{id}", getBuisness).Methods("GET")                             --> good
	r.HandleFunc("/api/Name={name}", QueryByName).Methods("GET")                  --> good
                                        with failure                            --> good
                                        with return                             --> good
	r.HandleFunc("/api/test", createBuisness).Methods("POST")                     --> good
	r.HandleFunc("/api/user={user}/", updateBuisness).Methods("PUT")              --> good
	r.HandleFunc("/api/{id}", removeBuisness).Methods("DELETE")                   --> good
	r.HandleFunc("/api/tag={tags}/inclusive={incl}", queryByTags).Methods("GET")  --> good

*/

/*
----------------------------------------------------------------

Testing Parse Login: has 3 states:
1. Successful => testing in: TestParseLoginPasswordFound
2. Uknown username => testing in: TestParseLoginUsername_Unknown
3. Incorrect password => testing in: TestParseLoginPasswordFound
------------------------------------------------------------------
*/
func TestParseLoginUsername_Unknown(t *testing.T) {
	initDB()
	fmt.Println("START SPRINT 3 TESTS")
	var jsonLogin_not_found = []byte(`{"username": "unkown", "password": "testing_password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonLogin_not_found))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseLogin)
	handler.ServeHTTP(rr, req)

	var notFound = []byte(`{"loginStatus":"Username_Not_Found"}`)
	var found = rr.Body.String()

	status := 0
	if strings.Contains(found, "Not_Found") {
		status = 200
	} else {
		status = 0
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", string(notFound), rr.Body.String())
	}
}

func TestParseLoginPassword(t *testing.T) {

	initDB()

	var jsonLogin_not_found = []byte(`{"username": "", "password": "testing_password"}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonLogin_not_found))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseLogin)
	handler.ServeHTTP(rr, req)

	var notFound = []byte(`{"loginStatus":"Incorrect_Password"}`)
	var found = rr.Body.String()

	status := 0
	if strings.Contains(found, "Incorrect") || strings.Contains(found, "Password") {
		status = 200
	} else {
		status = 0
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", string(notFound), rr.Body.String())
	}
}

func TestParseLoginPasswordFound(t *testing.T) {

	initDB()
	var jsonLogin_not_found = []byte(`{"username": "", "password": 0}`)

	req, err := http.NewRequest("POST", "/api/login", bytes.NewBuffer(jsonLogin_not_found))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseLogin)
	handler.ServeHTTP(rr, req)

	var back = []byte(`{"loginStatus":"Successful"}`)
	var found = rr.Body.String()

	status := 0
	if strings.Contains(found, "successful") || strings.Contains(found, "Successful") {
		status = 0
	} else {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", string(back), rr.Body.String())
	}
}

/*
--------------------------------------------------------------
Testing Parse register: has 4 states:
1. Successful => testing in: TestParseRegistry_Successful
2. Username taken => testing in: TestParseRegistry_Uname
3. Email taken => testing in: TestParseRegistry_Email
4. Password do not match => testing in: TestParseRegistry_Pword
------------------------------------------------------------------
*/
func TestParseRegistry_Successful(t *testing.T) {
	initDB() // initialize DB to test
	var jsonData = []byte(`{
  "email" : "ttt@test.com",
  "username" :"124",
  "password" : "password_unique",
  "confirmPassword" : "password_unique"
  }`)

	req, err := http.NewRequest("POST", "api/register", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseRegistry)
	handler.ServeHTTP(rr, req)
	status := 0 // set arbitrary status value, will change next

	if strings.Contains(rr.Body.String(), "Successful") {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Successful", rr.Body.String())
	}
}

// need to change the email unless database is cleared before running test cases
func TestParseRegistry_Uname(t *testing.T) {
	initDB() // initialize DB to test

	var jsonData = []byte(`{
  "email" : "012@test.com",
  "username" :"",
  "password" : "password_unique",
  "confirmPassword" : "password_unique"
  }`)

	req, err := http.NewRequest("POST", "api/register", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseRegistry)
	handler.ServeHTTP(rr, req)
	status := 0 // set arbitrary status value, will change next

	if strings.Contains(rr.Body.String(), "Username") ||
		strings.Contains(rr.Body.String(), "Taken") ||
		strings.Contains(rr.Body.String(), "Username_Taken") {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Username_Taken", rr.Body.String())
	}
}

func TestParseRegistry_Email(t *testing.T) {
	initDB() // initialize DB to test
	// testing with the email from the first TestParseRegistry used
	var jsonData = []byte(`{
  "email" : "",
  "username" :"test123456",
  "password" : "password_unique",
  "confirmPassword" : "password_unique"
  }`)

	req, err := http.NewRequest("POST", "api/register", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseRegistry)
	handler.ServeHTTP(rr, req)
	status := 0 // set arbitrary status value, will change next

	if strings.Contains(rr.Body.String(), "Email") ||
		strings.Contains(rr.Body.String(), "Registered") ||
		strings.Contains(rr.Body.String(), "Email_Registered") {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Email_Registered", rr.Body.String())
	}
}

func TestParseRegistry_Pword(t *testing.T) {
	initDB() // initialize DB to test
	// testing with the email from the first TestParseRegistry used
	var jsonData = []byte(`{
  "email" : "test_password121121@test.com",
  "username" :"test_password002219",
  "password" : "test_password_unique",
  "confirmPassword" : "break_confirm"
  }`)

	req, err := http.NewRequest("POST", "api/register", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(parseRegistry)
	handler.ServeHTTP(rr, req)
	status := 0 // set arbitrary status value, will change next

	if strings.Contains(rr.Body.String(), "Unmatched") ||
		strings.Contains(rr.Body.String(), "Password") ||
		strings.Contains(rr.Body.String(), "Unmatched_Password") {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Unmatched_Password", rr.Body.String())
	}
}

/*
----------------------------------------------------
Testing Query by name:
Has two status:
1. Failure              => testing with TestQueryByName_Fail
2. Will return something=> testing with TestQueryByName_Pass
----------------------------------------------------
*/
func TestQueryByName_Fail(t *testing.T) {
	initDB()

	var Name = []byte(`{"name"="test_fail"}`)
	req, err := http.NewRequest("GET", "/api/Name={name}", bytes.NewBuffer(Name))

	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(QueryByName)
	handler.ServeHTTP(rr, req)

	status := 0 // arbitrary value set to 0 to be changed later depending
	// on status of action
	status_update := ""
	if strings.Contains(rr.Body.String(), "uname") &&
		strings.Contains(rr.Body.String(), "") {
		status = 200
		status_update = "failure"
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Failure", status_update)
	}
}

func TestQueryByName_Pass(t *testing.T) {
	initDB()

	var Name = []byte(`{"name"=""}`)
	req, err := http.NewRequest("GET", "/api/Name={name}", bytes.NewBuffer(Name))

	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(QueryByName)
	handler.ServeHTTP(rr, req)

	status := 0 // arbitrary value set to 0 to be changed later depending
	// on status of action
	status_update := ""
	if strings.Contains(rr.Body.String(), "uname") &&
		strings.Contains(rr.Body.String(), "") {
		status = 200
		status_update = "pass"
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Failure", status_update)
	}
}

/*
----------------------------------------------------
Testing Query by Tags:
Has two status:
1. Failure              => testing with TestQueryByTags_Fail
2. Return something     => testing with TestQueryByTags_Pass
----------------------------------------------------
*/

func TestQueryByTags_Fail(t *testing.T) {
	initDB()

	// some tags to test:
	var tags = []byte(`{"qtaglist"="fail", "inclString": "AND"}`)
	// start test case setup:
	req, err := http.NewRequest("GET", "/api/tag=fail/inclusive=AND", bytes.NewBuffer(tags))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(queryByTags)
	handler.ServeHTTP(rr, req)
	//	println(rr.Body.String())
	status := 0
	if strings.Contains(rr.Body.String(), "buisnessTags") &&
		strings.Contains(rr.Body.String(), "Business categories be") {
		status = 200
	}

	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Failure", status)
	}
}

func TestQueryByTags_Pass(t *testing.T) {
	initDB()

	// some tags to test:
	var tags = []byte(`{"qtaglist"="", "inclString": "AND"}`)
	// start test case setup:
	req, err := http.NewRequest("GET", "/api/tag=none/inclusive=AND", bytes.NewBuffer(tags))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(queryByTags)
	handler.ServeHTTP(rr, req)
	// println(rr.Body.String())
	status := 0
	if strings.Contains(rr.Body.String(), "buisnessTags") &&
		strings.Contains(rr.Body.String(), "Business categories be") {
		status = 200
	}
	if status != 200 {
		t.Errorf("got invalid response, expected %v, got: %v", "Pass", status)
	}
}

