
# Sprint 4

## Video Links:
Back-end: https://youtu.be/aWpm9c8Uwso

Front-end: https://youtu.be/wa3naaD76UM

## Front-end:

### Ivan:

Work completed this sprint: 

 -Developed the search page. The search page initialied and displayed every buisness in the backend into small widgets. On clicking one of them, it would call the respective business's images and create a popup of the business profile (only public information a normal user would want to know). This included name, selected tags, address, description and a rotating roll of images that can iterate at the tap of a button. This search page also had a 'no image uploaded' in the case that the business did not upload any images of their company. The search page also had a filtering functionality that worked with the tags. Depending on the tags selected for filtering- the backend would send a list of buisnesses that contained all those tags and I would read and display dynamically.
 
 -Finalized profile setup: It was difficult to fill out the profile setup page with what was previously there (becuase tags and the images were stored differently in the backend than they were implemented in the front end). So I developped a 'preview' button that lets the business see what their latest business profile would look like to the average user. Once they submit changes- it would update the preview- this could be done any number of times.
 
 -Wrote front-end and back-end functinality: Rohan and I met many times to work out the communication between the front end and backend. This sprint- I feel like I learnt a lot about the http requests and how to parse and read the many different json package files that the backend would give in return.
 
 -Wrote the tests: Cypress testing was able to work in conjunction/ simultaniously with the backend on my computer, so I was able to automate the database filling process! I was also able to use that database/ working backend code in order to test a multitude of front end functionalities.
 
 Some of the tests include: 
 
 -Registering 20+ unique business accounts with unique names and unique tag selections.
 
 -Login in the 20+ unique business accounts
 
 -Testing the popup errors given invalid credentials on both the login and register pages as well as a successful update of business information
 
 -Testing the cross functonality between the login/ register page (getting to one from the other with routing)
 
 -Testing updating registered businesses with new information (updating a business many times to see if it would result in error at any point)
 
 -Testing if updating the business would load the correct information to an average user on the search page (latest business update should be shown)
 
 
 -Testing if the tag filtering works (done by checking existing businesses with tags, and edge cases)
 
 -Edge cases for tags: Selecting 5+ tags for filtering should result in no businesses. Selecting 0 Tags should result in ALL businesses.
 
 -Testing the image next button given select manually entered businesses with manually entered pictures. 

** All these tests can be seen under the Cypress folder in the code**

-Wrote the **frontend_readme.md** (in the app folder in the code) which contains detailed information on how the program works (all the major functionailites and how to use each one) as well as how to run the code with the backend (specfically why commands to use and why!)
 
 All in all this was an extremely eventful sprint- it was quite difficult to work though all the unexpected problems. Nevertheless, all things considered, I am really proud of how we were able to work as a team to develop a substantial and working program that we can be proud of. The most important take away was not how to write functional code per say, but understanding how the software development process is completed as a team. Communicating needs, errors and any guidance to others when it is most needed. Without this team- I dont believe I would be able to craete something like this. I am very grateful for them!
### Wavid: 
Work completed this sprint: 
 - Developed pop-ups for use in all modules throughout the application and ensured their correct display. This includes different error messages for:
  - Login: credentials not found and incorrect password
  - Register: Password mismatch, email not valid/in use, username taken
  - Profile Setup: Submission recieved box
  
 - Developed New UI for Login and Register to make it easier for users to tell whether their form submission would be accepted or not. When a user has a textbox   "focused" they will see a red highlight if that form field would not be accepted to be checked for credentials in our system or a green highlight if it would properly submit. This was applied to both login and register. 
 
- Established uniform use of the global "userSignedIn" for ease of management of what user's profile is going to be edited at any given time. This required coordination with the Back-end, specifically working with Rohan to ensure the information sent from the backend was correctly unpackaged and stored in the global variable

- Ensured correct NavBar display based on what user is signed in. Fixed a bug where the user would still be able to edit a business page after logging out

- Compiled list of application dependencies for the project to be correctly displayed on another computer, specifically for the frontend. The backend team added to this list as well. See **dependencies.md**

- Removed extraneous "testing" buttons from the register, login, and Navbar components. Ensured correct functionaility of these components. This required a non-zero amount of bugfixing and many horus of googleing documentation about interactions of different Angular imports

-I dealt with merge-conflict resolution many times throughout this sprint, as it was the culmination of our individual code bases combining and interacting completely. The lines of what was "Ivan's part" or "Wavid's part" became much less clear as time passed, as I implimented features in things Ivan was working on and vice versa. I had the least issues of the 4 of us when resolving merge conflicts, so it became one of my roles

Overall, this project was a lot of fun, if not very frustrating at times. I am glad to have experienced coding a webapp for the first time, and it is not as scary as it first seemed. I am very happy with our final outcome overall, especially considering none of us came in with any SWE experience. The course was supposed to be an introduction to the field, and I feel like it did just that. My biggest takeaway from this project is not how to do the weird one-off things in angular like injectables or dialogs, but how to meaningfully code in a team with components that affect what one another is working on. 
## Back-end:
### Blake:
Work completed this sprint: 
 This sprint I worked on test cases to ensure that the back-end was working properly given a multitude of different scenarios. Within these tests, I made sure that things such as updating specific data of a business profile worked properly by expanding on previous test cases of 'updateBusiness' and including test cases that update business addresses, business tags, business images, and business descriptions. Furthermore, I ensured that the back-end was able to properly handle storing images into the database, as that was how we decided we were going to go about storing images to send to the front end for this implementation of the project. I also ensured that when searching by tags the user was able to switch between using 'AND' and 'OR' to change the results of the search. These test cases also included a simulation of what would occur if there were no businesses with the tags that were being searched for. This was to show that the back-end was able to send the correct businesses to the front-end if the user were to search for businesses that were not valid. 
 
 To see a description of each test case added to this sprint, please refer to the 'backend_readme.md' which can be found in the localbusinessFinder/backend folder of this repository. 
 
 Overall, this sprint was polishing functions that we already had for testing while implementing some new functions that were created for handle imaging and allowing the front-end to retrieve those images from the back-end. 
 
 ### Rohan: 
 Work completed for sprint 4: 
 This sprint I worked primarily on futher BE and FE integration (like parsing backend data) and image storage and presentation. For the images, I initially considered storing them in a Base64 string directly into the database, but this would be a bad idea as each entry in the database would contain multiple large strings and would greatly decrease search time. To circumvent this, I decided to store the images in a a directory that is created when the user registers. When the user makes a post in the profile setup component, it sends the text data and image data to seperate endpoints (a callback function loops through all the inputted images and adds them to the user's image repository.) When the getImage function handler is called, then a JSON struct with the text data and image data (as seen in documentation) is sent to the frontend and can be parsed accordingly. 
 
 In terms of integration, most of the work was done by the frontend on the additions I made in the last sprint. Wavid's error popups used the status' that were creaeted in the last sprint to determine when to pop up. Additionally, I helped implement the parsing for the for the GetAll businesses endpoint and the tag filter endpoint in the front end, which allowed for each business to have thier own page. Additionally, as mentioned in Wavid's section, I helped with setting up the username global variable so we did not need to use the "username" that was present in previous iterations of the project. 
 
 Once feature that we attempted to make was the ability for the profile-setup page to show the current values for all the business varibles. I was able to successfully get the front end to parse the information, but we decided that we would drop that feature as we developed the feature a little late and we had to abide by the time constraints. 
