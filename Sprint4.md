
# Sprint 4

## Video Links:
Back-end: 
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
