document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "350px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function showSignup() {
  document.getElementById("signup-form").style.visibility = "visible";
}

// let signupButton = document.getElementById("callSignup");
// let signupForm = document.getElementById("signup-form");
// signupButton.addEventListener(onclick, (signupForm.style.display = "block"));
