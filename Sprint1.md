# Front-end:

Youtube Link to video: https://www.youtube.com/watch?v=dvvSo_izhKc&ab_channel=IvanSaldarriaga

**User Stories**
_General User Stories for the entire Front-end part of the project_
- As a **business owner**, I want to be able to **upload product images and descriptions for my buisness** page to that customers/ app users can see what products the buisness provides.
- As a **business owner**, I want to be able to **drag and drop my images** to make the upload process simpler on my end!
- As a **business owner**, I want to be able to **set tags **related to my company to allow customers to quickly grasp what type of buiness I am running!
- As a **business user** I want the process of displaying my company to be easy and intuitive so that I do not need to worry about aesthetics or any technical aspects of displaying my information.
(General idea) Have a drag and drop for the buiness logo, name, banner, products and captions for EVERY buisness. Location of each is not customizable, but the images and descriptions (bio) are!
- **make a sign in page** - for users with saved business prefs and businesses to make/edit their page

**What issues your team planned to address:**

For the front-end team, we planned to tackle the sign-in and develop profile for the business user- deciding to start with the business user as they are the center of our project. We planned to get familiar with angular and typescript to make the integration with the backend more simple at a later date. We planned to do research on what libraries or angular components could be immplemented to make the application not only run smoother, but make it less complicated.

**Which ones were successfully completed:**

We were able to successfully generate both a sigh in and create a profile page. In the login page, the user is prompted to enter a username and and password. Moreover, in the create profile page, the user can enter data that will be publicly displayed once the application is fully complete. What was demonstrated in the video was: Company/ Business name, an address, a short description of the company and a image uploader. The image uploader allows the user to browse through their files and select images- then converting them into url links via. a Dom Sanitizer. These images are stored in an array, and then displayed with an image preview. 

**Which ones didn't and why?**

Ivan: I tackled the drag and drop with ngx-file-drop. While I was able to get it working, displaying the images through generated urls was difficult with the component. Hence, for this sprint, only the browse button was imlplemented- hoping to merge the two concepts into one once I get more familiar with angular. Some other user stories that were not complete yet were the rest of the "profile set-up" page such as business tags. This one was not succesfully completed because we still need to communicate what preset tags should be offer for the user to pick from and how many.
Wavid: I did not succesfully make the registration page although it should be relatively easy to complete as it is another implementation of the login page (copy and paste, but with email). I got sick towards the end of the sprint and that limited the amount of user stories I couuld complete/ flesh out.
Both: The implementation with teh back-end was something we were not able to comlplete by this sprint because both front and back-end were familiarizing ourselfes with our respective languages.




# Back-end:

**Youtube link to video: ** https://www.youtube.com/watch?v=57br3O9kbqs

**User stories**:
_General User Stories for the entire Back-end part of the project_
- As a **customer**, I want to **log into my account** so that **I can find local businesses**.
- As a **customer**, I want to **be able to access public business pages using the business name**, so that **I can discover local businesses that I would  like to go to**.
- As a **customer**, I **want the business webpage to provide publicly available information on the business such as the name, address, category, logo, and  description** so that **I have an easy way of finding where to go and if it is a business I would like to visit**.
- As a **customer,** I want to **be able to create a business account with a username and password** so **I can log into my business page and make edits to my business page**.
- As a **customer**, I want to **be able to include different images of my business and relevant information about my business** to **make sure that when   the account is created it is ready for the public to see**.


**What issues your team planned to address:**

Our team planned to address the initial setup of a database that could store a business struct. We planned to address the need for the front-end team to be able to access data from that database and show it on the screen. This was tested using the html/template feature of Go. Within this, we were able to sucessfuly get data from the database and use that to navigate to different pages as well as have a user signup page and a user login page. Additionally, we were planning on connecting it directly to the angular portion of the front-end. Furthermore, we were planning on implementing the ability to add images to the business page by including them in the business struct.

**Which ones were successfully completed:**

The issues that were sucessfully completed included setting up the database by implementing a function REST API that included the functionality of using the method 'GET' to allow the user to get their business page through different functions such as 'getBusiness' and 'getAllBusinesses', creating a business struct, using templates to invoke different methods of the database from a mock front-end, and enabling the user to signup and login to their account using the username and password that was provided to the database during the signup. 

**Which ones didn't and why:**

The issues that were not implemented during this sprint was the implementation of the database into the angular component of the front end. This was because of the fact that we intended to ensure that the database was fully functional prior to implementing it into the front end. Additionally, we wanted to wait until both front-end and back-end had a good starting point within this first sprint so that each team understood how everything that they implemented worked to ensure that when it came time to implement the database into the front-end, we were able to do so easier. Another issue that was not implemented within this sprint was the ability to store images within the business struct of the database. This was due to the fact that we were unsure how the images would be saved when given to the front-end. Once this is figured out, this issue will be implemented in later sprints.
