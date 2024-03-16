firebase.firestore().collection('classes').get().then((querySnapshot) => {
    //For each document in the collection, do the thing
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Populate a series of cards based on what classes exist within the classes collection
      const cardContent = `
        <div class="cards-column">
        <div class="card">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <p>Card Count: ${data.cardAmount}</p>
          <a href="review.html?class=${doc.id}" class="button">Review</a>
          </div>
        </div>
      `;
     
      document.querySelector('.cards-container').innerHTML += cardContent;
    });
  });