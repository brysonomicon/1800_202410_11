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
        // have event listeners that handle what happens next.
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

// Function to import decks from a JSON file
async function importDecksFromJSON(jsonData) {
    const db = firebase.firestore();

    try {
        // Loop through the JSON data and add each deck to Firestore
        for (const deck of jsonData.decks) {
            await db.collection('decks').doc(deck.id).set(deck);
        }
        console.log("Decks imported successfully!");
    } catch (error) {
        console.error("Error importing decks:", error);
    }
}

// Event listener for importing decks when a file is selected
document.getElementById('importDecksInput').addEventListener('change', async function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async function (event) {
        const jsonData = JSON.parse(event.target.result);
        await importDecksFromJSON(jsonData);
    };
    reader.readAsText(file);
});

//checks to make sure a user is logged in, if not send them to login.html
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        console.log("User is signed in:", user);
    } else {

        window.location.assign("login.html");
    }
});

