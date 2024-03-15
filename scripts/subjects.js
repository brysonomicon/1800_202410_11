//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
// function displayCardsDynamically(collection) {
//     let cardTemplate = document.getElementById("subjectTemplate"); // Retrieve the HTML element with the ID "subjectTemplate" and store it in the cardTemplate variable. 

//     db.collection(collection).get()   //the collection called "subjects"
//         .then(allSubjects=> {
//             //var i = 1;  //Optional: if you want to have a unique ID for each subject
//             allSubjects.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().name;       // get value of the "name" key
//                 // var details = doc.data().details;  // get value of the "details" key
// 				// var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
//                 // var hikeLength = doc.data().length; //gets the length field
//                 let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

//                 //update title and text and image
//                 newcard.querySelector('.chapterTitle').innerHTML = title;
//                 // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
//                 newcard.querySelector('.card-text').innerHTML = details;
//                 // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

//                 //Optional: give unique ids to all elements for future use
//                 // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                 // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                 // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                 //attach to gallery, Example: "hikes-go-here"
//                 document.getElementById(collection + "-go-here").appendChild(newcard);

//                 //i++;   //Optional: iterate variable to serve as unique ID
//             })
//         })
// }

// displayCardsDynamically("subjects");  //input param is the name of the collection