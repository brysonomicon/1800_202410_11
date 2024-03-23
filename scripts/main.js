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


//When the user hits the landing page, this updates their role to "standard" will need to be adjusted when the "power user" role is setup, otherwise it will overwrite and "force" the user to be standard whenever they log in.
// unless we make "power user" a completely different field that gives permissions, which doesn't seem like a terrible option. everyone becomes a standard user just by logging in, this way we could limit read permissions to logged in 
// users and delineate write permissions depending on what the user is trying to write. standard users could make cards and update their profile information, while power users would be able to update cards and verify sets.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Check if this is a new user by attempting to get their user document
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        userRef.get().then(doc => {
            if (doc.exists) {

                userRef.update({
                    role: 'Standard',
                }).then(() => {
                    console.log("User role set to Standard");
                }).catch(error => {
                    console.error("Error setting user role:", error);
                });
            }
        });
    }
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {

        const userPointer = firebase.firestore().collection('users').doc(user.uid);
        userPointer.get().then(doc => {
            if (doc.exists) {

                const userData = doc.data();
                const userRole = userData.role || 'Standard';

                document.getElementById('user-role-display').textContent = userRole;
            } else {
                console.log("User document not found");

            }
        }).catch(error => {

        });
    } else {
        console.log("Not signed in.");

    }
});


//This function now gets the userID of the logged in user and uses it to display their saved card sets. If there are no saved card sets, it serves a link to go to Browse and suggests the user save some sets.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //verifies user is logged in and creates an object of their id
        console.log("User is signed in:", user);
        const userId = user.uid;
        //checks the userid against the savedclasses metadata
        firebase.firestore().collection('users').doc(userId).get().then((userDoc) => {
            const userData = userDoc.data();
            const savedClasses = userData.savedClasses;

            //if the user has saved classes, display them
            if (savedClasses && savedClasses.length > 0) {
                document.querySelector('.cards-container').innerHTML = '';
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
                // if there are saved classes, show the browse button
                document.getElementById('browse-button').style.display = '';
            } else {
                document.querySelector('.cards-container').innerHTML = '<p class="no-save-found">No saved classes found. <br>Why not <a href="browse.html" class="action-button">Browse Card Sets</a> to save?</p>';
                // hide the hardcoded browse button because it shows up in the message when there are no saved classes to display
                document.getElementById('browse-button').style.display = 'none';
            }
        }).catch(error => {
            console.error("Error fetching user's saved classes:", error);
        });

    } else {
        window.location.assign("login.html");
    }
});

