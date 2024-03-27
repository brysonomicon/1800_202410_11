function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
  }).catch((error) => {
    // An error happened.
  });
}

document.getElementById('mobile-menu').addEventListener('click', function () {
  // Checks to make sure it's mobile query to prevent breaking the navbar in desktop mode
  if (window.innerWidth <= 700) {
    var menu = document.querySelector('.navbar-menu');
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
    }
  }
});

window.addEventListener('resize', function () {
  var menu = document.querySelector('.navbar-menu');
  // If media query returns to desktop mode, fixed broken navbar
  if (window.innerWidth > 700) {
    menu.style.display = "";
    menu.style.flexDirection = "row";
  } else {
    menu.style.flexDirection = "column";
  }
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, so you can allow them access to the page
    console.log("User is signed in:", user);
  } else {
    // No user is signed in, redirect them to the login page
    window.location.assign("login.html");
  }
});


// function to set theme
function setTheme(theme) {
  // Change the stylesheet link based on the selected theme
  var stylesheetLink = document.querySelector('link[href^="./styles"]');
  switch (theme) {
      case 'default':
          stylesheetLink.href = './styles/styles.css';
          break;
      case 'light':
          stylesheetLink.href = './styles/light.css';
          break;
      case 'neon':
          stylesheetLink.href = './styles/neon.css';
          break;
      default:
          break;
  }

  // Store the selected theme preference in Local Storage
  localStorage.setItem('theme', theme);
}

// Function to apply the theme stored in Local Storage
function applyStoredTheme() {
  var storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
      setTheme(storedTheme);
  }
}

// Apply the stored theme when the page loads
applyStoredTheme();


