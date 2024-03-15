document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('new-card-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Retrieve form data
        const cardClass = document.getElementById('topic').value;
        const cardChapter = document.getElementById('chapter').value;
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;

        const db = firebase.firestore();

        // Add a new flashcard document within the class -> chapters -> chapter -> flashcards structure
        const flashcardRef = db.collection('classes').doc(cardClass).collection('chapters').doc(cardChapter).collection('flashcards');

        flashcardRef.add({
            question: question,
            answer: answer,
            class: cardClass,
            chapter: cardChapter
        })
        .then(function(docRef) {
            console.log("Flashcard added with ID: ", docRef.id);
            alert('Flashcard created successfully!');
            form.reset(); // Optional: Reset the form after successful submission
        })
        .catch(function(error) {
            console.error("Error adding flashcard: ", error);
            alert('Error creating flashcard.');
        });
    });
});