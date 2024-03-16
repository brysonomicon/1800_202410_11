document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('new-card-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Extract form values
        const cardClass = document.getElementById('topic').value;
        const cardChapter = document.getElementById('chapter').value;
        const question = document.getElementById('question').value;
        const answer = document.getElementById('answer').value;

        // Check if the class is pre-approved
        if (!isClassPreApproved(cardClass)) {
            console.error("Class is not pre-approved.");
            alert('This class is not pre-approved for adding flashcards.');
            return;
        }

        try {
            await addFlashcard(cardClass, cardChapter, question, answer);
            console.log("Flashcard created successfully!");
            alert('Flashcard created successfully!');
            form.reset();
        } catch (error) {
            console.error("Error processing request: ", error);
            alert('Error creating flashcard.');
        }
    });
});

async function addFlashcard(classId, chapterId, question, answer) {
    const db = firebase.firestore();
    const classRef = db.collection('classes').doc(classId);
    const chapterRef = classRef.collection('chapters').doc(chapterId);

    // Ensure class document exists, create if not
    const classDoc = await classRef.get();
    if (!classDoc.exists) {
        console.error("Specified class does not exist.");
        return;
    }

    // Ensure chapter document exists, create if not
    const chapterDoc = await chapterRef.get();
    if (!chapterDoc.exists) {
        await chapterRef.set({
            name: chapterId, // Set initial metadata for new chapter
        });
    }

    // Proceed to add the flashcard
    const docRef = await chapterRef.collection('flashcards').add({
        question: question,
        answer: answer,
        class: classId,
        chapter: chapterId
    });

    // Update the metadata for both the chapter and class
    await updateMetadata(classRef, chapterRef);
}

function isClassPreApproved(classId) {
    const preApprovedClasses = ['comp1510', 'comp1537', 'comp1113']; // Extend this as needed
    return preApprovedClasses.includes(classId);
}

async function updateMetadata(classRef, chapterRef) {
    const chapterFlashcardsSnapshot = await chapterRef.collection('flashcards').get();
    const chapterCardAmount = chapterFlashcardsSnapshot.size;
    await chapterRef.update({ cardAmount: chapterCardAmount });

    let totalClassCards = 0;
    const chaptersSnapshot = await classRef.collection('chapters').get();
    for (const chapterDoc of chaptersSnapshot.docs) {
        const chapterData = await chapterDoc.ref.get();
        totalClassCards += chapterData.data().cardAmount || 0;
    }
    await classRef.update({ cardAmount: totalClassCards });
}






firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, so you can allow them access to the page
        console.log("User is signed in:", user);
    } else {
        // No user is signed in, redirect them to the login page
        window.location.assign("login.html");
    }
});