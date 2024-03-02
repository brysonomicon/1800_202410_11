//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDuWRtCofmcNOo3iexyKrd3KtDJghFbuSY", 
    authDomain: "flashcardin-bby11.firebaseapp.com", 
    projectId: "flashcardin-bby11",
    storageBucket: "flashcardin-bby11.appspot.com", 
    messagingSenderId: "116301727947",
    appId: "1:116301727947:web:18bbd179c002214d27334e"
  };
  

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();