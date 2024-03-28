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

firebase.firestore().collection('decks').get().then((querySnapshot) => {

  // Makes sure there are some decks to display, otherwise says none are found
  if (querySnapshot.empty) {
    document.querySelector('.cards-container').innerHTML = '<p>No decks found.</p>';
    return;
  }

  // Empty the container before loading in the cards
  document.querySelector('.cards-container').innerHTML = '';

  // For each document in the collection, do the thing
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    //uses doc.id to set a dynamic id that gets updated below to display a snapshot of the size of the collection
    //this is an easy and scalable way to display the number of cards in a deck using the inherent firestore syntax
    const cardContent = `
      <div class="cards-column">
        <div class="card">
          <h3>${doc.id}</h3>
          <p>${data.description || "No description available."}</p>
          <p id="card-count-${doc.id}">Card Count: Loading...</p>
          <a href="review.html?deck=${doc.id}" class="button">Review</a>
          <a href="javascript:void(0);" class="button save-deck" data-deck-id="${doc.id}">Save</a>
        </div>
      </div>
    `;

    document.querySelector('.cards-container').innerHTML += cardContent;

    //takes a snapshot of hte cards collection within a given class and returns the size of the document collection
    doc.ref.collection('cards').get().then((cardsSnapshot) => {
      document.getElementById(`card-count-${doc.id}`).textContent = `Card Count: ${cardsSnapshot.size}`;
    });
  });
});

// Function to save a class to the user's saved classes
async function saveClassToUser(classId) {
  const user = firebase.auth().currentUser;
  if (!user) {
      console.log("No user is signed in.");
      return;
  }
  
  const currentUser = user.uid;
  const userRef = firebase.firestore().collection('users').doc(currentUser);
  
  try {
      //Transaction ensures that partial updates don't happen. function either finishes completely, or not at all.
      await firebase.firestore().runTransaction(async (transaction) => {
          const userDoc = await transaction.get(userRef);
          if (!userDoc.exists) {
              throw "User document does not exist!";
          }
          const userData = userDoc.data();
          const savedClasses = userData.savedClasses || [];
          
          // Check if the classId is already in savedClasses to prevent duplicates
          if (!savedClasses.includes(classId)) {
              savedClasses.push(classId);
              // Update the user document with the new list of saved classes
              transaction.update(userRef, { savedClasses: savedClasses });
              console.log(`Class ${classId} saved successfully.`);
          } else {
              console.log(`Class ${classId} is already saved.`);
          }
      });
  } catch (error) {
      console.error("Error saving class to user:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards-container');

  cardsContainer.addEventListener('click', (event) => {
      // Check if the clicked element or any of its parents have the 'save-deck' class
      const saveButton = event.target.closest('.save-deck');

      if (saveButton) {
          // Correctly retrieve the classId from the data attribute
          const classId = saveButton.getAttribute('data-deck-id');
          console.log('Attempting to save classId:', classId); // Logging for debugging

          saveClassToUser(classId)
              .then(() => {
                  alert('Class saved successfully!');
              })
              .catch((error) => {
                  console.error('Error saving class:', error);
                  alert('Failed to save class.');
              });
      }
  });
});




