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

//points to the document of the user who is logged in
var currentUser;               
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {
                  
                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userName = userDoc.data().name;
                            let userEmail = userDoc.data().email;
                            let userSchool = userDoc.data().school;
                            let userCountry = userDoc.data().country;
                            let userRole = userDoc.data().role;


                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            if (userEmail != null) {
                               document.getElementById("emailInput").value = userEmail;
                          }
                            if (userSchool != null) {
                                document.getElementById("schoolInput").value = userSchool;
                            }
                            if (userCountry != null) {
                                document.getElementById("countryInput").value = userCountry;
                            }
                            if (userRole != null) {
                                if (userDoc.data().verifier) {
                                    document.getElementById("roleOutput").value = 'Verifier';
                                } else {
                                document.getElementById("roleOutput").value = userRole;
                                }
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function saveUserInfo() {
  // grabs users entered values.
  userName = document.getElementById("nameInput").value;
  userEmail = document.getElementById("emailInput").value;
  userSchool = document.getElementById("schoolInput").value;
  userCountry = document.getElementById("countryInput").value;

  // updates database with above values.
  currentUser.update({
    name: userName,
    email: userEmail,
    school: userSchool,
    country: userCountry

  })
  // console prompt to validate update.
  .then(() => {
    console.log("Profile successfully updated!");

  })

}

function requestVerifierRole() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const currentUser = db.collection("users").doc(user.uid);
            currentUser.update({
                verifier: true
            }).then(() => {
                console.log("User role updated to verifier successfully!");
                showModal("Your role has been updated to Verifier.");
                document.getElementById("roleOutput").value = "Verifier"; // Update role display
            }).catch(error => {
                console.error("Error updating user role:", error);
                showModal("Failed to update your role. Please try again.");
            });
        } else {
            console.log("No user is logged in.");
            showModal("You need to be logged in to request a role.");
        }
    });
}
