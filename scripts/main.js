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
firebase.auth().onAuthStateChanged(function (user) {
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

//Applies user role
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

//turned that ugly callback hell function into something more readable.
firebase.auth().onAuthStateChanged(async function (user) {
    //if no user is logged in, send the client to the login page. ain't no random users gettin in here!
    if (!user) {
        window.location.assign("login.html");
        return;
    }
    //confirm logged in user in the console then try to grab their saved classes from the users doc
    //according to the userId of the logged in user.
    console.log("User is signed in:", user);
    try {
        const userId = user.uid;
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data();
        const savedClasses = userData.savedClasses;

        //if there are saved classes, show them. if not, serve a link to the browse page and hide the 
        //other browse button. so the user page always has a link to browse, but only one.
        if (savedClasses && savedClasses.length > 0) {
            await displaySavedClasses(savedClasses);
            document.getElementById('browse-button').style.display = '';
        } else {
            displayNoSavedClassesMessage();
        }
    } catch (error) {
        console.error("Error fetching user's saved classes:", error);
    }
});

//function that displays the saved classes if they exist
async function displaySavedClasses(savedClasses) {
    const cardsContainer = document.querySelector('.saved-cards');
    cardsContainer.innerHTML = '';

    for (const classId of savedClasses) {

        const classDoc = await firebase.firestore().collection('decks').doc(classId).get();


        if (!classDoc.exists) {
            console.log(`No document found for class ID: ${classId}`);
            continue;
        }

        const data = classDoc.data();
        const cardContent = `
            <div class="cards-column">
                <div class="card">
                    <h3>${classDoc.id || 'No name available'}</h3> <!-- Assuming 'name' is a field -->
                    <p>${data.description || "No description available."}</p>
                    <p id="card-count-${classDoc.id}">Card Count: Loading...</p>
                    <a href="review.html?deck=${classDoc.id}" class="button">Review</a>
                    <a href="javascript:void(0);" class="button save-deck" data-deck-id="${classDoc.id}">Save</a>
                </div>
            </div>
        `;

        cardsContainer.innerHTML += cardContent;


        classDoc.ref.collection('cards').get().then((cardsSnapshot) => {
            const cardCountElement = document.getElementById(`card-count-${classDoc.id}`);
            if (cardCountElement) {
                cardCountElement.textContent = `Card Count: ${cardsSnapshot.size}`;
            }
        }).catch(error => {
            console.error("Error getting card count:", error);
            const cardCountElement = document.getElementById(`card-count-${classDoc.id}`);
            if (cardCountElement) {
                cardCountElement.textContent = "Card Count: Error";
            }
        });
    }
}


//sends this message if there are no saved classes.
function displayNoSavedClassesMessage() {
    const message = '<p class="no-save-found">No saved classes found. <br>Why not <a href="browse.html" class="action-button">Browse Decks</a> to save?</p>';
    document.querySelector('.cards-container').innerHTML = message;
    document.getElementById('browse-button').style.display = 'none';
}



