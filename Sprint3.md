# Sprint 3

## Video Links:
Back-end: https://youtu.be/hGJQSQE2DUw
Front-end: https://youtu.be/JvaWVG97-hI

## Front-end:
### Ivan:
Created the routing module and set up all the routes. For the routing, I created a navigation bar such that the user can navigate the app easily- and linked each fitting component to their respective navigation bar title. This was done using several materials packages such as the toolbar, icons and buttons! I also created the backgrounds for the applicaiton in order to make the application appealing and interesting to look at. This implementation promped a lot of change to layouts such as the profile setup component/ page and the login and register pages that Wavid re-colored. By creating the framework of the rest of the project (such as the 'search sprouts' button on the home page I designed which will lead to the searching buisnesses though filters page) I was able to setup our team for a hopefully less strenuous final sprint.Something  I really tried to do was have the profile setup component designed in such a way that it can be reused and minorly altered to fit the spots where the buisness page is displayed! Almost as a template used in all the places where the business information would be needed! These pushes were done in the New-Version-Sprout branch and then Wavid merged the two into the main branch!
### Wavid: 
Edited the routing module Ivan created to have 2 different modes: one for when you are signed into an account and one for when you are not. Introduced functionality for seperate modules to be able to see this information using the @Input and @Output decorators. I recolored the login and register pages to match the color scheme and background that Ivan created. These changes improved functionality and aesthetics. See above for version history information. 
## Back-end:
### Blake:
Created new test cases to ensure that all new features added within the backend were implemented correctly and work correctly given different test cases. Added testing to the new 'parseLogin', 'parseRegistry', 'queryByName' and 'queryByTags'. Each function that got testing has test cases that ensure that each of the status that should be returned are returned properly. For more information on the test cases added refer to the backend_readme file within the backend folder. To see the test cases and implementation of testing, refer to the 'main_testing.go' file within the backend folder. 
### Rohan: 
Backend & Frontend Integration: Added implmentation for storing tags from the Profile setup page into the business models. Also created some new queries for Business name and business tags with options for OR and AND-ing the tags in the query. Also set up methods to read and parse structs in the front-end that are sent from the backend, which allows for conditional routing in the login page. The login page only routes to setup if there is a match in the database. Finally added password hashing for security to prevent the security breaches in the event of a database leak. 
