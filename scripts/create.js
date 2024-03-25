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


//Wait for page to load, then let user use the card-form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-card-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // creates objects from the form fields to be used in database adding
        const deckIdField = document.getElementById('topic'); 
        const questionField = document.getElementById('question'); 
        const answerField = document.getElementById('answer'); 
        const detailsField = document.getElementById('details'); 

        //takes the value from the form field and turns it into an object
        const deckId = deckIdField.value;
        const question = questionField.value;
        const answer = answerField.value;
        const details = detailsField ? detailsField.value : ''; 

        try {
            //adds the flashcard to the database
            await addFlashcard(deckId, question, answer, details);
            console.log("Flashcard created successfully!");
            alert('Flashcard created successfully!');

            // Reset the fields
            deckIdField.value = '';
            questionField.value = '';
            answerField.value = '';
            detailsField.value = '';
        } catch (error) {
            console.error("Error processing request: ", error);
            alert('Error creating flashcard.');
        }
    });
});

    //takes the field objects from above and uses them to add the values to the database.
    //to add/remove functions make sure you have consistent values from above to add here
    async function addFlashcard(deckId, question, answer, details) {
        const db = firebase.firestore();
        const deckRef = db.collection('decks').doc(deckId);

        // if the deck doesn't exist, create it with this default metadata
        const deckDoc = await deckRef.get();
        if (!deckDoc.exists) {
            await deckRef.set({
                title: deckId,

            });
        }

        // Proceed to add the flashcard directly under the deck
        const docRef = await deckRef.collection('cards').add({
            question: question,
            answer: answer,
            details: details
        });

        console.log(`Flashcard added with ID: ${docRef.id}`);
    }

    //checks to make sure a user is logged in, if not send them to login.html
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            console.log("User is signed in:", user);
        } else {
            
            window.location.assign("login.html");
        }
    });