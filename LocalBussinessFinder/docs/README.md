#Backend Documentation: 

##The "Buisness" Model: 
The Buisness model contains the data that will each buisness account will.
The Buisness struct is converted into a model that will outline the schema 
for the database (currently in sqlite) that contains the buisness accounts. 
Currently, the information stored in the buisness model is: 

- Account Username
- Account Password
- ID (Identification) 
- Buisness name
- Buisness Address
- Address
- Category
- Description 

More will be added in future iterations of the project (including image etc). 

##REST API: 
A rudimentary Rest API has been implimented for the buisness. So far, the following 
routes and http methods have been implemented: 

The following list is of the following format: 

(route, http method) : Description of handler function: 

- ('/', GET) : Gets all the entries in the database outputted in JSON format. 
- ('/{id}, GET}: Gets the JSON for a specific database entry with the provided ID
- ('/', POST): Adds entries into the database
- ('/{id}', PUT): Updates the database entry with provided id with the information provided in the request header
- ('/{id}' DELETE): Removes database entry with provided ID. 

##Instructions to Run: 
The main.go file can be run by using the following commands: 
- go build main.go 
- ./main

This will activate the web server. 

The webserver is located at localhost:3000 on your local machine. A program like Postman can be 
used to test if routing works correctly with the route, method pair. 
