document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('new-card-form');
    //When the form submit button is pressed, do the function
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get the information from each field of the form
        const cardClass = document.getElementById('topic').value;
        const cardChapter = document.getElementById('chapter').value;
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;

        // Make a database object
        const db = firebase.firestore();

        // Make a collection and document for each of the fields
        const flashcard = db.collection('classes').doc(cardClass).collection('chapters').doc(cardChapter).collection('flashcards');

        // Add the field information to the corresponding metadata for the flashcard
        flashcard.add({
            question: question,
            answer: answer,
            class: cardClass,
            chapter: cardChapter
        })
        // Then alert the user it was successful
        .then(function(docRef) {
            console.log("Flashcard added with ID: ", docRef.id);
            alert('Flashcard created successfully!');
            form.reset();
        })
        .catch(function(error) {
            console.error("Error adding flashcard: ", error);
            alert('Error creating flashcard.');
        });
    });
});