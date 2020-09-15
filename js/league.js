// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

checkAnswer = function () {
  if (document.getElementById("puzzel_antwoord").value.toUpperCase() == "XAYAHRAKAN") {
      document.getElementById('buttonstart').style.visibility = "visible";
      document.getElementById('bericht5').style.visibility = "visible";
  }
}
checkAnswer()

// Laat antwoord checken
check_antwoord.onclick = function () {
  checkAnswer()
}