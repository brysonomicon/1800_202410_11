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
