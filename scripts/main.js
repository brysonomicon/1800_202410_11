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

<<<<<<< HEAD
//This function now gets the userID of the logged in user and uses it to display their saved card sets. If there are no saved card sets, it serves a link to go to Browse and suggests the user save some sets.

=======
>>>>>>> 87a283fc665002b2ab067775a72c923491e02517
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //Confirms a user is logged in. Otherwise they would be redirected to login.html
        console.log("User is signed in:", user);

        // userid of the logged in user
        const userId = user.uid;
        firebase.firestore().collection('users').doc(userId).get().then((userDoc) => {
            const userData = userDoc.data();
            const savedClasses = userData.savedClasses; // Get the array of saved class IDs

            if (savedClasses && savedClasses.length > 0) {
                // Clear the container before populating it with saved classes
                document.querySelector('.cards-container').innerHTML = '';

                // Fetch each saved class and populate the card
                savedClasses.forEach(classId => {
                    firebase.firestore().collection('classes').doc(classId).get().then((classDoc) => {
                        const classData = classDoc.data();
                        const cardContent = `
                            <div class="cards-column">
                                <div class="card">
                                    <h3>${classData.name}</h3>
                                    <p>${classData.description}</p>
                                    <p>Card Count: ${classData.cardAmount}</p>
                                    <a href="review.html?class=${classDoc.id}" class="button">Review</a>
                                </div>
                            </div>
                        `;
                        document.querySelector('.cards-container').innerHTML += cardContent;
                    });
                });
            } else {
                // Handle case where there are no saved classes
                document.querySelector('.cards-container').innerHTML = '<p class="no-save-found">No saved classes found. Why not <a href="browse.html" class="action-button">Browse Card Sets</a>browse some decks</a> to save?</p>';
            }
        }).catch(error => {
            console.error("Error fetching user's saved classes:", error);
        });

    } else {
        // No user is signed in, redirect them to the login page
        window.location.assign("login.html");
    }
});
