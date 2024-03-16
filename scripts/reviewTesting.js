let cardIndex = 0; 

firebase.firestore().collection('classes').doc('comp1510').collection('chapters').doc('chapter1').collection('flashcards').get().then(querySnapshot => {
    // Array to store flashcard data
    const flashcardsList = [];
    querySnapshot.forEach(doc => {
        //Add flashcard data to the array 
        flashcardsList.push(doc.data()); 
    });

    function displayFlashcard(index) {
        const cardData = flashcardsList[index];
        document.getElementById("className").innerHTML = cardData.class;
        document.getElementById("chapterName").innerHTML = cardData.chapter;
        document.getElementById("question").innerHTML = cardData.question;
        document.getElementById("answer").innerHTML = "";
    }

    displayFlashcard(cardIndex);

    document.getElementById("showAnswer").addEventListener("click", function () {
        const cardData = flashcardsList[cardIndex];
        document.getElementById("answer").innerHTML = cardData.answer;
    });

    document.getElementById("clearAnswer").addEventListener("click", function () {
        document.getElementById("answer").innerHTML = "";
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        cardIndex++;
        if (cardIndex < flashcardsList.length) {
            displayFlashcard(cardIndex);
        } else {
            document.getElementById("question").innerHTML = "";
            document.getElementById("answer").innerHTML = "";
            document.getElementById("end").innerHTML = "You've finished your card set.";
        }
    });
});
