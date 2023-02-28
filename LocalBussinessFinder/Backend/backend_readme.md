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

## Instructions to Test:
The main.go file and http requests can be tested using the main_test.go file, which has test cases that add coverage for 'GET', 'DELETE', 'POST', and
'PUT' Http requests. 
To run the tests, use the following commands:
- To run all tests within the file:
  - 'go test -v'
- To run specific tests within the file:
  - 'go test -v -run <name of testing function>'

## Testing Coverage and Implementation:
Each test case handles each handler method similarly,
  - First, start the database
  - Then, define what the method is going to request (handler method)
      - and the path of that request, ie. "/id" or just "/"
  - Then start a new recorder for httptest that can check the status
  - Define which function from main it is calling in the 'http.HandlerFunc()'
  - Use handler.ServeHTTP(rr, req) to have it write to the recorder
  - Check if status code is as expected.

## Current implementation with front-end:
As of right now, an html template is being used for both logging in and signing up. By navigating to
localhost:3000/signup, users are able to create an account which is stored in the database. Once that is
done, it redirects the user to their business page (localhost:3000/{businessName}). After the initial
signup, the user can use localhost:3000/login to sign into their account, which also redirects to
their business page (localhost:3000/{businessName}). 
