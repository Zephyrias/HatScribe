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

  var hatPer = 25;
  var expPer = 25;
  var starPer = 25;
  var losePer = 25;
  var result = Math.floor(Math.random()*100);
  if(result < hatPer){
    //Drop a hat
    addNotification("Hat",0);
  }
  else if(result < hatPer + expPer){
    //Give Exp
    //Maybe a proper amount of EXP as well
    addNotification("XP",curLevel*100);
    addExp(curLevel*100);
  }
  else if(result < hatPer + expPer + starPer){
    //Give a star
    numStars = numStars + 1;
    //Maybe a notification?
  }
  else{
    //Nothing happens!
    //WOO!
  }
  var tempArray = document.getElementsByName('numStars');
  for(var i = 0; i < tempArray.length;i++)
  {
    tempArray[i].innerHTML = numStars;
  }

  if (numStars <= 0)
  {
    $("#gambleButton").attr("disabled", true);
    $("#breakButton").attr("disabled", true);
  }
}