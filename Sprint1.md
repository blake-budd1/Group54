#Back-end:

User stories:
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
