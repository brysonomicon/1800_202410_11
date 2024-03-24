let cardIndex = 0;

// Extract 'deck' parameter from URL query string
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('deck');
// window.location.search returns the query string poriton of the current URL (Example: ?deck=COMP1510)
// URLSearchParams parse and manipulate the query string

firebase.firestore().collection('decks').doc(subject).collection('cards').get().then(querySnapshot => {
    // Array to store flashcard data
    const flashcardsList = [];
    querySnapshot.forEach(doc => {
        //Add flashcard data to the array 
        flashcardsList.push(doc.data());
    });

    function displayFlashcard(index) {
        const cardData = flashcardsList[index];
        document.getElementById("question").innerHTML = cardData.question;
        document.getElementById("answer").innerHTML = "";
    }

    displayFlashcard(cardIndex);


    document.querySelector(".flashcard-container").addEventListener("click", function () {
        const cardData = flashcardsList[cardIndex];
        document.getElementById("answer").innerHTML = cardData.answer;
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        cardIndex++;
        if (cardIndex < flashcardsList.length) {
            if (document.getElementById("answer").innerHTML.trim() !== "") {
                document.querySelector(".flashcard").click();
            }
            displayFlashcard(cardIndex);
        } else {
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "You've finished your card set.";
            document.getElementById("end").innerHTML = "You've finished your card set.";
            document.getElementById("nextButton").style.display = "none";
        }
    });

    document.getElementById("backButton").addEventListener("click", function () {
        if (cardIndex > 0) {
            cardIndex--;
            displayFlashcard(cardIndex);
            document.getElementById("end").innerHTML = "";
            document.getElementById("nextButton").style.display = "inline";
        }
    })
});






