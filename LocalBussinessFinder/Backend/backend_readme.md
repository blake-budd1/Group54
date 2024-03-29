# Backend Documentation: 

## The "Business" Model: 
The Business model contains the data that will each business account will.
The Business struct is converted into a model that will outline the schema 
for the database (currently in sqlite) that contains the business accounts. 
Currently, the information stored in the business model is: 

- Account Username
- Account Password
- Business name
- Business Address
- Address
- Category
- Description 

More will be added in future iterations of the project (including image etc). 
*Note: each struct has an ID that is given by GORM, which the reason there is not one within the business struct

## Sprint 1

## REST API: 
A rudimentary Rest API has been implimented for the buisness. So far, the following 
routes and http methods have been implemented: 

The following list is of the following format: 

(route, http method) : Description of handler function: 

- ('/', GET) : Gets all the entries in the database outputted in JSON format. 
- ('/{id}, GET}: Gets the JSON for a specific database entry with the provided ID
- ('/', POST): Adds entries into the database. This is done through using a /signup form in an html template which allows the user
-              to enter their information on their end and save it into the database in JSON format. 
- ('/{id}', PUT): Updates the database entry with provided id with the information provided in the request header
- ('/{id}' DELETE): Removes database entry with provided ID. 

## Instructions to Run: 
The main.go file can be run by using the following commands: 
- go build main.go 
- ./main

This will activate the web server. 

The webserver is located at localhost:3000 on your local machine. A program like Postman can be 
used to test if routing works correctly with the route, method pair. 

## Current implementation with Postman (Sprint 1):
As of right now, an html template is being used for both logging in and signing up. By navigating to
localhost:3000/signup, users are able to create an account which is stored in the database. Once that is
done, it redirects the user to their business page (localhost:3000/{businessName}). After the initial
signup, the user can use localhost:3000/login to sign into their account, which also redirects to
their business page (localhost:3000/{businessName}). 


## Sprint 2

## Current implementation with angular front-end (as of Sprint 2): 
The REST API remains, but there is now greater interaction between the front end and the backend. Users can regsister thier accounts from the front end interface, and they can make edits to thier buisnesses using the Profile Setup components from the front end. Additionally, there the loginParser and RegistryParser first perform necessary queues on the database to determine if the the login and account registry is valid or not. The current version of the "Business" databse model also allows for the storage of image names (assuming images are stored in the front end server and not in the database). 

## Instructions on parsing backend response JSONS: 
The Login, Registry, and Setup have special response codes that the front end can use to determine to perform conditional rendering. 

Login Component (loginStatus): 
 - "Username_Not_Found": The username entered is not in the database 
 - "Incorrect_Password": The Username has been found but the password is incorrect
 - "Success" The username has been found and the correct password was provided, this gives the queue to the front end to route to the Buisness     account page

Register Component (Reg_State): 
- "Unmatched_Password" : The entry in "Password" and "Confirm Password" do not match
- "Email_Registered" : An account with an identical email to the one provided exists in the database
- "Username_Taken" : An account with an idential username to the one provided exists in the database
- "Successful" : The account registration was successful, queue to route to the Buisness Account page. 

Profile Setup Component (update_status): 
The profile setup will be done in the Buisness account page. Once the routing the implemented, the username of the updating buisness will be extracted from the origin of the PUT request. As a temporary solution the user must input the username manually, this will not be needed when routing is implemented. 

- "User_Not_Found": The Username of the entry to receive the update is not in the database. 
- "Success": The updates were successful 

## Parsing delimeter Strings
Due to SQLite limitations, arrays cannot be stored as attributes to our GORM Model. We hope to update this in future sprints. Due to thier simplicity and relatively short length, the names of images and the tags for categories are stores in a singular string where the entries are seperated by semicolons. There will be a check implemented to ensure that no image filename has a semicolon in the name. It is assumed that the front end will store all uploaded images in an asset file.

Example: For an account the images attribute may look like
"Picture1.png;Picture2.png;Picture3.png"

The front-end can easily parse this string and isolate the images in its asset storage that is associated with each account. 

## Instructions to Test:
To run the tests, use the following commands:
- To run all tests within the file:
  - 'go test -v'
- To run specific tests within the file:
  - 'go test -v -run {name of testing function}'
  - example: go test -v -run TestGetBusiness

## Testing Coverage and Implementation:
The main.go file and http requests can be tested using the 'main_test.go' file, which has test cases that add coverage for 'GET', 'DELETE', 'POST', and
'PUT' http requests. It also tests trying to access ID's that are not in the database to make sure that can be handled without 
causing any errors.
Each test case handles each handler method similarly: 
  - First, start the database
  - Then, define what the method is going to request (handler method)
      - and the path of that request, ie. "/id" or just "/"
  - Then start a new recorder for httptest that can check the status
  - Define which function from main it is calling in the 'http.HandlerFunc()'
  - Use handler.ServeHTTP(rr, req) to have it write to the recorder
  - Check if status code is as expected, which will be returned from the handler method function.
  - If status code is equal to 'StatusOk' which is equal to 200, then the test passed, otherwise,
      - returned a different status code and failed test case.

 # Sprint 3
 
  ## Necessary Go Modules:
  ### For Testing: 
 - "bytes"
 - "encoding/json"
 - "fmt" (For debugging) 
 - "net/http"
 - "log"
 - "hash/fnv"
 - "net/http/httptest"
 - "strings"
 - "testing"
  
  -"github.com/gorilla/handlers"
	-"github.com/gorilla/mux"
	-"gorm.io/driver/sqlite"
	-"gorm.io/gorm"


 - To ensure Go has these modules, run:
 - go get -u (module name)
 - ie. go get -u encoding/json


 ## Testing Coverage:
 The main_test.go file was updated to include 11 new test cases (each with a desription below):
 - TestQueryByTags_Pass : Tests passing tags in that will prompt a response
 - TestQueryByTags_Fail : Tests passing tags in that will not be found, no response will be recieved
 - TestQueryByName_Pass : Tests passing a username in that will prompt a response
 - TestQueryByName_Fail : Tests passing a username in that will not prompt a response
 - TestParseRegistry_Pword : Tests creating an account with a password that does not match the confirm password
 - TestParseRegistry_Email : Tests creating an account with an email that has already been used
 - TestParseRegistry_Uname : Tests creating an account with a username that has already been used
 - TestParseRegistry_Successful : Tests creating an account with all unique information which successfully creates an account
 - TestParseLoginPasswordFound : Tests login with a successful username and password
 - TestParseLoginPassword : Tests login with an incorrect password
 - TestParseLoginUsername_Unknown : Tests login with an unknown username
 
 ## Testing Implementation:
 These tests were created to ensure that all features implemented within sprint 3 were working correctly. The biggest changes in this sprint were the    query by tags, the query by name, and the abilitiy for the registry and login to send back a status depending on what went wrong or right. The test cases make use of those status returns by sending data that is either expected to be incorrect or correct and reading those status returns to figure out whether the action that was performed returned the expected status. This status was determined using string.Contains(rr.Body.String(), "expected string"), where rr.Body.String() is what was returned from the function that was being called in the 'main.go' file. 
 
 ## Further Testing:
 In the future sprints, testing will have to be done on what the front-end requires from back end and to see if that is being sent properly. Additionally, any new features that may be implemented within the last sprint (sprint 4) will also require test cases to ensure that each action that could happen with that functionality will perform in the expected manner. 
 
##Updated API: 
Most changes were made in Back-end and Front end integration. There are some new queries that are available via the API. 

Queries: 
  - "/api/name={Name}" :
    * Gets Businesses JSON File with provided name in database. Returns an empty string if no database is found. 

  Example: "localhost:4200/api/name=Walmart" 

  - "/api/tag={Tags}/inclusive={AND or OR} 
    * Gets a list of all busineses with the tags in the "tags" bracket. The tags are delimited by commas. The inclusive tag determines if the businesses
    * should contain all the tags or at least on the tags provided. The inclusive tag can only contain "AND" or "OR" as these results are 
    * directly used in the SQL query.
    
  Example: "localhost:4200/api/tag=pet-friendly,food,boba/inclusive=OR" 
  
  Updates: 
    
  The Passwords are now stored as integer hashes on the database to secure data incase of a database leak. 
  
  
# Sprint 4
 ## Necessary Go Modules:
  ### For Testing: 
  Same as included in 'Sprint 3' section.
  ### For Running the Server: 
  "/encoding/base64" (Included in Go) 
  "os" (Included in Go) 
  
 ## Testing Coverage:
 The main_test.go file was updated to include 11 new test cases (each with a desription below):
 - TestCreateBusiness_fail : Ensure that creating an account with an invalid account works properly
 - Testing updating specific parts of a business account:
     - TestUpdateBusiness_Address
     - TestUpdateBusiness_Description
     - TestUpdateBusiness_TagArray
     - TestUpdateBusiness_Images
 - TestUpdateBusiness_invalidURL : Ensure that trying to update an account with an invalid URL won't work and will give the correct error
 - Testing query by tages (updated since part 3):
     -  TestQueryByTags_FailAND
     -  TestQueryByTags_PassAND
     -  TestQueryByTags_PassOR
     -  TestQueryByTags_FailOR
 -  Testing posting images using 'postImage' function:
     -  TestPostImages_pass
     -  TestPostImages_fail  
 ## Testing implementation:
 These tests were chosen to ensure that the back-end will work properly no matter what situation is provided by the user in the front-end.
 With these tests, we ensure that even when invalid inputs for different account setup and description properties are inputted, the program
 is able to continue running properly. 
 
 ## Updates to Data Integration: 
 Image upload (PNG/JPG) are now supported by Sprout. They are stored on a local filesystem of the server that is running main.go. The images are meant for public use, so they are assumed to be non-senstive data, so they are not encrypted. The images are stored not stored in any order and are sent back to the front end via Base64 encoding. 
 
 ## Api Updates: 
 Endpoint: '/api/user={uname}'
 - The GetBusiness method now splits the data into text data (name, tagList, address, etc) and the images, held in and imageHolder object. 
 - Example: 
 -
 - Buisness : {
 -    BusinessText : {
         - Name: "New Business", 
         - Address : "222888 Willow Lane",
         - Username : "User" 
         - Password : 1888381 // Password hash
         - Tags : food;pet-friendly
         }
         
       -ImageInfo : {
          - ImageHolder : 
              { 
                 -  name : Img1.png,
                 -  encodedImg : (BASE64)
              }
            { 
                -  name : Img2.png,
                -  encodedImg : (BASE64)
            }
       
        
       
       }
      
 
 Endpoint: '/api/user={user}/images' Method (POST) 
 - Post image/file data as Form Data to endpoint. It will 

Endpoint : '/api/register' Method (POST) 
 -  Adds a new directory in the imageStorage directory for the user. 
 
Endpoint : '/api/user={uname}' Method(POST)
- Clears image directory and adds a new directory in the imageStorage folder. 
 
  

# Sprint 4
 ## Necessary Go Modules:
  ### For Testing: 
  Same as included in 'Sprint 3' section.
  
 ## Testing Coverage:
 The main_test.go file was updated to include 11 new test cases (each with a desription below):
 - TestCreateBusiness_fail : Ensure that creating an account with an invalid account works properly
 - Testing updating specific parts of a business account:
     - TestUpdateBusiness_Address
     - TestUpdateBusiness_Description
     - TestUpdateBusiness_TagArray
     - TestUpdateBusiness_Images
 - TestUpdateBusiness_invalidURL : Ensure that trying to update an account with an invalid URL won't work and will give the correct error
 - Testing query by tages (updated since part 3):
     -  TestQueryByTags_FailAND
     -  TestQueryByTags_PassAND
     -  TestQueryByTags_PassOR
     -  TestQueryByTags_FailOR
 -  Testing posting images using 'postImage' function:
     -  TestPostImages_pass
     -  TestPostImages_fail  
 ## Testing implementation:
 These tests were chosen to ensure that the back-end will work properly no matter what situation is provided by the user in the front-end.
 With these tests, we ensure that even when invalid inputs for different account setup and description properties are inputted, the program
 is able to continue running properly. 
  
