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

const expandTable = () => {
  [...document.querySelectorAll(".monExpand")].forEach(el => {
    if (el.style.display === "none") {
      el.style.display = "block";
    } else el.style.display = "none";
  });
};

[...document.querySelectorAll("#overview div")].forEach((el, index) => {
  el.onclick = () => document.location.replace(`/weeks/${index}`);
});

document.getElementById("monClick").onclick = () => expandTable();
// expandTable("monExpand")
