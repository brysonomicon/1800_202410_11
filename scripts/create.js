//Wait for page to load, then let user use the card-form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('new-card-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Make sure these are correctly referenced within this scope
        const deckIdField = document.getElementById('topic'); // Ensure 'topic' is the correct ID
        const questionField = document.getElementById('question'); // Ensure 'question' is the correct ID
        const answerField = document.getElementById('answer'); // Ensure 'answer' is the correct ID
        const detailsField = document.getElementById('details'); // If you have a details field, ensure 'details' is the correct ID

        const deckId = deckIdField.value;
        const question = questionField.value;
        const answer = answerField.value;
        const details = detailsField ? detailsField.value : ''; // Handle case where detailsField might not exist

        try {
            await addFlashcard(deckId, question, answer, details);
            console.log("Flashcard created successfully!");
            alert('Flashcard created successfully!');

            // Reset the fields
            deckIdField.value = '';
            questionField.value = '';
            answerField.value = '';
            if (detailsField) detailsField.value = ''; // Reset this field only if it exists
        } catch (error) {
            console.error("Error processing request: ", error);
            alert('Error creating flashcard.');
        }
    });
});


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








    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in, so you can allow them access to the page
            console.log("User is signed in:", user);
        } else {
            // No user is signed in, redirect them to the login page
            window.location.assign("login.html");
        }
    });