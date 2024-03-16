function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();


// Reads collection of classes for our cardTemplate to dynamically generate on landing screen its document contents on landing page

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("classCardTemplate"); // Retrieve the HTML element with the ID "classCardTemplate" and store it in the cardTemplate variable. 

    db.collection("classes").get()   //the collection called "classes"

        .then(allClasses=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each subject
            allClasses.forEach(doc => { //iterate thru each doc
                var title = doc.data(); // get key name of each class
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                
                // var cardCh = doc.data().chapter;  // get value of the "cardChapter" key
				// var chQuestion = doc.data().question;    // get value of the "question" key
                // var chAnswer = doc.data().answer; // get value of the "answer" key
                
                //update title and text
                newcard.querySelector('.card-class').innerHTML = title;
                newcard.querySelector('a').href = "eachClass.html?docID="+docID;
               
                // newcard.querySelector('.card-chapter').innerHTML = cardCh;
                // newcard.querySelector('question').innerHTML = chQuestion;
                // newcard.querySelector('answer').innerHTML = chAnswer;

                //attach to gallery, Example: "classes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("classes");  //input param is the name of the collection


// Reads collection of chapters for a class after clicking review on that said class.
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("chapterCardTemplate"); // Retrieve the HTML element with the ID "chapterCardTemplate" and store it in the cardTemplate variable. 

    db.collection("chapters").get()   //the collection called "chapters"

        .then(allChapters=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each subject
            allChapters.forEach(doc => { //iterate thru each doc
                var chTitle = doc.data().cardChapter; // get the value of the "chapter" key
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                
                //update title and text
                newcard.querySelector('.card-ch').innerHTML = chTitle;
                newcard.querySelector('a').href = "eachChapter.html?docID="+docID;

                //attach to gallery, Example: "chapters-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("chapters");  //input param is the name of the collection


// Reads collection of flashcards for a chapter after clicking review on that said class.
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("flashCardTemplate"); // Retrieve the HTML element with the ID "chapterCardTemplate" and store it in the cardTemplate variable. 
    db.collection("flashcards").get()   //the collection called "flashcards"
        .then(allFlashcards=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each subject
            allFlashcards.forEach(doc => { //iterate thru each doc
                var classTitle = doc.data().class; // get the "chapter" key
                var classCh = doc.data().chapter;
                var question = doc.data().question;
                var answer = doc.data().answer;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                
                //update title and text
                newcard.querySelector('.card-flash').innerHTML = classTitle;
                newcard.querySelector('.card-ch').innerHTML = classCh;
                newcard.querySelector('.card-q').innerHTML = question;
                newcard.querySelector('.card-ans').innerHTML = answer;
                newcard.querySelector('a').href = "eachCard.html?docID="+docID;
               
                // newcard.querySelector('.card-chapter').innerHTML = cardCh;
                // newcard.querySelector('question').innerHTML = chQuestion;
                // newcard.querySelector('answer').innerHTML = chAnswer;

                //attach to gallery, Example: "classes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("flashcards");  //input param is the name of the collection