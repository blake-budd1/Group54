Front-End Video Link: https://youtu.be/5cWSl-lBc5Q

Back-End Video Link:

****FRONTEND:****

*Wavid:*
  worked with Rohan to create a method for the form submissions for account creation and login to be sent to backend to interact with database of user info. 
  created test cases for the form submit function in the login and register components
    These test cases are showing as pending, as they are awaiting a response from the backend which is not running during the "test" function
   Fixed some css/looks issues with the login and register pages
   created new system for object updating re: when people fill the form. This is so that it is easy to send backend the object as a JSON

*Ivan: *

  **Developped test cases for the Profile Setup Component (focusing specifically on different scenarios for inserting and deleting both iamges and tags). *Can be found in the profile-setup.component.spec.ts* I wanted to develop several tests for the componenets I felt needed special attention, specifically the add images and select tags. I thought of several different cases for each and will continue to add more. The test for removing a tag actually revealled a flaw in my code- so it was very helpful to learn and critically think about my code**
  
  Developped a buiness struct to save all the input materials (images, tags, address etc. etc.) so that it could all be sent to backend once the submit button is pressed. Worked with the backed to create the angular post requests.
  
  Debugged the Jasmine/Karma framework so it would run with the HTTP Client and also the end to end tests using Cypress. Moreover, I learned to debug using the console and worked with the backend to help them understand the anguular framework in order to better cooperate.
  
  **Worked on learning the Cyrpess framework to develop out first e2e test that constitutes of filling out the registration component and pressing the submit button (can be seen in the cypress e2e test file)**
  
As far as the next steps for the front end- routing and developpping the rest of our program (its main functionality) is out next big goal. We have worked on creating a solid framework and strong understanding of the languages and process of communication so that our next steps would come easier and seem less daunting!
  
