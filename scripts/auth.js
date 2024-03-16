// Named function for sign-in success callback
function handleSignInSuccess(authResult, redirectUrl) {
    const user = authResult.user;
    if (authResult.additionalUserInfo.isNewUser) {
        const userData = {
            name: user.displayName || "Unnamed User", // Fallback for users without a displayName
            email: user.email,
            country: "Canada",
            school: "BCIT"
        };
        return addUserToFirestore(user.uid, userData);
    }
    // For existing users, no need to prevent automatic redirect.
    return true;
}

// Named function to hide the loader UI
function hideLoaderUI() {
    document.getElementById('loader').style.display = 'none';
}

// Adds a new user to Firestore and handles redirect or error logging
function addUserToFirestore(userId, userData) {
    db.collection("users").doc(userId).set(userData).then(() => {
        console.log("New user added to firestore");
        window.location.assign("main.html"); // Redirect to main.html after signup
    }).catch(error => {
        console.error("Error adding new user:", error);
        return false; // Prevent automatic redirect on error
    });
    return false; // Prevent automatic redirect until promise resolves
}

// Configuration for the FirebaseUI Widget
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: handleSignInSuccess,
        uiShown: hideLoaderUI
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    tosUrl: '<your-tos-url>', // link to terms of service URL from login widget 
    privacyPolicyUrl: '<your-privacy-policy-url>' // link to privacy policy url from login widget
};

// Initialize the FirebaseUI Widget using Firebase and start the UI.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
