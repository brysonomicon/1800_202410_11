function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);

                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in.");
        }
    })
}

insertNameFromFirestore();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-card-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent the form from submitting immediately.

        // Display the modal
        document.getElementById('customPrompt').style.display = 'flex';

        // The "Submit Form" and "Review My Information" buttons inside the modal
        // should have event listeners that handle what happens next.
    });
});

document.getElementById('submitForm').addEventListener('click', async function () {
    // Retrieve form data
    const deckId = document.getElementById('topic').value;
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    const details = document.getElementById('details') ? document.getElementById('details').value : '';

    try {
        await addFlashcard(deckId, question, answer, details);
        console.log("Flashcard created successfully!");

        // resets the fields after successful submission
        document.getElementById('topic').value = '';
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
        document.getElementById('details').value = '';

        // show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // hides the success message after a period 
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error("Error processing request: ", error);

    }

    // Close the modal
    document.getElementById('customPrompt').style.display = 'none';
});

// Logic for "Review My Information" button remains the same
document.getElementById('cancelForm').addEventListener('click', function () {
    document.getElementById('customPrompt').style.display = 'none';
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

