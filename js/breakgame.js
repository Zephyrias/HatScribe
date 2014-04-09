//=============================================================
// Code related to the break game and the star system go here
//=============================================================


//-------------------------------------------------------------
// Global variables
//-------------------------------------------------------------

// Keeps track of how many stars you have.
var numStars = 3;


//-------------------------------------------------------------
// Helper Functions
//-------------------------------------------------------------

function gamble(){
	// Decrements stars and disables the appropriate buttons
	// when you run out of stars
  numStars = numStars - 1;
  var tempArray = document.getElementsByName('numStars');
  for(var i = 0; i < tempArray.length;i++)
  {
    tempArray[i].innerHTML = numStars;
  }
  alert('You just gambled!');

  if (numStars <= 0)
  {
    $("#gambleButton").attr("disabled", true);
    $("#breakButton").attr("disabled", true);
  }
}