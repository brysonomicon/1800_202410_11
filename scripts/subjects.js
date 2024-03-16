// ------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
// ------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("classCardTemplate"); // Retrieve the HTML element with the ID "classCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "classes"

        .then(allClasses=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each subject
            allClasses.forEach(doc => { //iterate thru each doc
                var title = doc.data().class;       // get value of the "cardClass" key
                var cardCh = doc.data().chapter;  // get value of the "cardChapter" key
				// var chQuestion = doc.data().question;    // get value of the "question" key
                // var chAnswer = doc.data().answer; // get value of the "answer" key
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-class').innerHTML = title;
                newcard.querySelector('.card-chapter').innerHTML = cardCh;
                newcard.querySelector('a').href = "eachClass.html?docID="+docID;
                // newcard.querySelector('question').innerHTML = chQuestion;
                // newcard.querySelector('answer').innerHTML = chAnswer;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('topic').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('chapter').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i); <-- for imgs

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("classes");  //input param is the name of the collection