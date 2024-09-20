# FlashCardin'

## 1. Project Description
Our team BBY 11 is developing a flash card/study aid application called Flash Cardin’ to help students and instructors to collate valuable study information by scanning documents and having certified sponsors unlike competitors.

Flash card project that allows users to use flash cards as a study tool. They can create, save and review flash cards that are shared globally amongst users. 

## 2. Names of Contributors
List team members and/or short bio's here... 
* I am Phyo Thu Kha, contributor to the Brysonomicon. wee
* I am Richard, contributor to the Brysonomicon. woo
* I'm Bryson, the author of the Brysonomicon.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, Javaa, VScode
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* ChatGPT 4.0 (helped us integrate functions)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Arrive at landing page
* Login/Signup
* Start flash cardin'

## 5. Known Bugs and Limitations
Here are some known bugs:
* Visual glitches in reviewing flash cards
* Import function not implemented properly
* ...

## 6. Features for Future
What we'd like to build in the future:
* User camera to build flash cards from document image
* Different user roles with permissions for delete/verify
* Import packages exported from contemporary apps
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, this is where users login
├── main.html                # main HTML file, this acts like a main page, shows user's saved cards
├── browse.html              # browse HTML file, this is where users will browse for each cards
├── create.html              # create HTML file, this is where users can create flash cards
├── review.html              # review HTML file, this is where reviews of cards will happen
├── profile.html             # profile HTML file, this is where users can edit their information, and change themes
├── template.html            # template HTLM file, this is use as a template for creating other html file
└── README.md

It has the following subfolders and files:
├── Firebase hosting files:
        ├──.firebase
            /hosting..cache  
        ├── 404.html                 
        ├── .firebaserc              
        ├── firebase.json            
        ├── firestore.indexes.json  
        └── firestore.rules                
├── images                       # Folder for images
        /fcLogo-removebg         # Our logo with background removed
        -preview.png     
        /fcLogo.png              # Our logo 
        /favicon.ico             # Our favicon
├── notcurrentlyused             # Folder for HTML and JS files that were use for testing and now currently not used        
├── scripts                      # Folder for scripts
        /firebaseAPI_            # FirebaseAPI, shared across all pages
        flashcardin.js
        /auth.js                 # JS for login.html
        /browse.js               # JS for broswe.html 
        /create.js               # JS for create.html
        /main.js                 # JS for main.html
        /profile.js              # JS for profile.html
        /review.js               # JS for review.html
        /script.js               # JS for loading navbar connected to skeleton.js
        /skeleton.js             # JS for navbar and footer, shared across all pages
├── styles                       # Folder for styles
        /light.css               # Style for light theme 
        /neno.css                # Style for blue theme
        /styles.css              # Style for default theme
└── text                         # Folder for navbar and footer
        /footer.html             # footer HTML file, this is our footer, shared across pages
        /navbar.html             # navbar HTML file, this is our navbar, shared across pages
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /blah.js                 # 
├── styles                   # Folder for styles
    /blah.css                # 



```


