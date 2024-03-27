function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                
            console.log($('#navbarGoesHere').load('./text/navbar.html'));
            console.log($('#footerGoesHere').load('./text/footer.html'));
        } else {
            // To Add
            console.log($('#navbarGoesHere').load('./text/nav_before_login.html'));
            console.log($('#navbarGoesHere').load('./text/footer.html'));
        }
    });
}
loadSkeleton();