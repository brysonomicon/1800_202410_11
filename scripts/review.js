
document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('deck');
    let cardIndex = 0;
    let flashcardsList = [];

    function fetchCards() {
        firebase.firestore().collection('decks').doc(subject).collection('cards').get().then(querySnapshot => {
            flashcardsList = querySnapshot.docs.map(doc => doc.data());
            displayCard();
            updateNavigationButtons();
        });
    }

    function displayCard() {
        const cardData = flashcardsList[cardIndex];
        document.getElementById("question").innerText = cardData.question;
        document.getElementById("answer").innerText = cardData.answer;
        document.getElementById("cardCounter").innerText = `${cardIndex + 1} / ${flashcardsList.length}`;
        // make sure the card is showing the question before flipping
        const flashcard = document.querySelector(".flashcard");
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');

        }
    }

    function updateNavigationButtons() {
        document.getElementById("backButton").style.display = cardIndex > 0 ? "block" : "none";
        document.getElementById("nextButton").style.display = cardIndex < flashcardsList.length - 1 ? "block" : "none";
        document.getElementById("exitButton").style.display = cardIndex >= flashcardsList.length - 1 ? "block" : "none";
        document.getElementById("exitButton").onclick = () => window.location.href = 'main.html';
    }

    document.getElementById("nextButton").addEventListener("click", () => {
        // Check if the card is showing the answer (flipped)
        if (document.querySelector(".flashcard").classList.contains('flipped')) {

            document.querySelector(".flashcard").classList.remove('flipped');
            // delays card change until animation is done to prevent showing answer during animation
            setTimeout(() => {
                moveToNextOrPreviousCard(1);
            }, 500);
        } else {
            moveToNextOrPreviousCard(1);
        }
    });

    document.getElementById("backButton").addEventListener("click", () => {
        // Check if the card is showing the answer (flipped)
        if (document.querySelector(".flashcard").classList.contains('flipped')) {
            // Flip back to the question side
            document.querySelector(".flashcard").classList.remove('flipped');
            // Delay moving to the previous card until the flip back animation completes
            setTimeout(() => {
                moveToNextOrPreviousCard(-1); // Move to the previous card
            }, 500); 
        } else {
            moveToNextOrPreviousCard(-1); // Move to the previous card
        }
    });

    function moveToNextOrPreviousCard(direction) {
        // Calculate new index based on direction (1 for next, -1 for previous)
        const newIndex = cardIndex + direction;
        // Boundary checks to ensure newIndex is within the array bounds
        if (newIndex >= 0 && newIndex < flashcardsList.length) {
            cardIndex = newIndex;
            displayCard();
            updateNavigationButtons();
        }
    }

    fetchCards();
});










