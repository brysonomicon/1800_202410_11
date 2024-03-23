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

