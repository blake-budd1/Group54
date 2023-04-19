# Frontend Documentation:

## Running the app:

Given the rescources- our entire application runs locally. The backend and
server runs using GO- while the front end runs using AngularTS. To get the
page running, open the code in an IDE like VSCode and move directory to
LocalBussinessFinder.

## Running the Backend:

-Navigate to the backend folder by changing directories to Backend.
-Run the 'go run main.go'

## Running the Frontend:

Our backend relies on the proxy which does not activate with the normal
ng serve. To run the backend and the front end simultaniusly- make sure
the backend has been started and then run the command npm start. This will
activate the proxy and allow for the communication to take place.

# Frontend Funcitonality:

## Creating an account:

To create an account, naviagte to the 'sign up!' button in the navigation
bar at the top of your screen and click on it. This will redirect you to
the register page. Here set up you account by filling out the form- notice
the color of the form input change depending on if your input was valid.
Assuming your account was not already created, you have input a valid email,
or if your username has not already been taken- click on the submit button!
Notice that if either of the previously mentionned cases were true, a popup
window will appear and notify you!
From the registration page you can also navigate to the login page by clicking
login.

## Loging In:

Assuming you already have created an account. Use the same credentials you used
to register to login and then submit the login button. If you used an incompatible
username or password, a popup window will notify you.

## Profile Setup:

After registering and logging in, you will be redirected to the profile setup page.
Here you can setup your business however you like. Fill out the form, chose from
our tags and upload some images! After you click on submit, the backend will be updated
with that information. To see your business in action- click on the preview button to
see how your business will look to the average user.

## Updating Business:

To reformat your business after craeting one- login and be redirected to the setup my
buisness page! It will be emptied for you to fill out again. If you want to view what
your business looked like before you want to change it, click on the preview button.
This will show the latest submit you made to your business.
NOTICE: After you click on submit- your business page will change based on ALL the new changes
to the profile setup page. So fill it all out as you desire.
After clicking submit- click on preview to see your changes and how they will look
to the average viewer.

## Searching through all businesses:

To access the main part of our program you do not need to create an account- accounts are meant
exclusively for small businesses!
Simply press on the big search bar in the home page and it will redirect you to a new interface
displaying all the current registered businesses on out app! Since this is running locally, there
will be nothing at first, but you can add businesses and they will show up as intended if this was
runnning on a remote server.
Each business will display on the right side with their business name and thier selected tags.
To filter your search through these businesses, direct yourself to the left side of the page.
It has a tag filter- select the tags that fit what you are looking for in a small business.
Click on submit when you are satisfied with your selections. The businesses that contain the tags
you selected (using AND- so you will only recieve buisnesses that meet those tags specifically)
will be displayed and replace the last list of businesses.
To reset the business search to the initial list of ALL businesses- either refresh the page or empty
the tag search and click submit.
Note: You can filter multiple times, it will continue to change the list as desired.

## Viewing a Business:

To view a business from the search page- simply press on the one you are interested in.
Each business is a button that willl display a widget popup containing all information
an average user will be interested in or need.
This includes:

- Business Name
- Tags associated with the business
- Business address
- Business description
- Business Images (if uploaded)
  Once you are satisfied with the information you learnt from this small
  business, click on the 'x' at the top right of the popup. This will close the popup
  and bring you back to where yuo left off on the search page!

## Viewing Business Images:

Each business images in stored in an array: to see all the images they uploaded
you must press on the next button below the image. This will iterate through
the business's images and loop around once it comes to the end of the images.
