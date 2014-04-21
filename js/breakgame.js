//=============================================================
// Code related to the break game and the star system go here
//=============================================================


//-------------------------------------------------------------
// Global variables
//-------------------------------------------------------------

// Keeps track of how many stars you have.
var numStars = 0;

// Is true if the user is currently in a result notification
var inResults = false;

//-------------------------------------------------------------
// Helper Functions
//-------------------------------------------------------------

function gamble(){
	// Decrements stars and disables the appropriate buttons
	// when you run out of stars
  if(inResults == true){
    return;
  }

  numStars = numStars - 1;

  var hatPer = 30;
  var expPer = 30;
  var starPer = 15;
  var losePer = 25;
  var result = Math.floor(Math.random()*100);
  if(result < hatPer){
    //Drop a hat
    addNotification("Hat",0);
    $("#rewardTxt").text("You won a hat!");
    $("#rewardImg").css("display","block");
    inResults = true;
  }
  else if(result < hatPer + expPer){
    //Give Exp
    //Maybe a proper amount of EXP as well
    var amount = Math.floor((curLevel*curLevel + 50*curLevel - 1)/4);
    addNotification("XP",amount);
    $("#rewardTxt").text("You got " + amount + " exp!");
    $("#rewardImg").css("display","block");
    inResults = true;
    addExp(amount);
    
  }
  else if(result < hatPer + expPer + starPer){
    //Give a star
    //numStars = numStars + 2;
    $("#rewardTxt").text("You got 2 stars!");
    $("#rewardImg").css("display","block");
    inResults = true;
    addNotification("Star",2);
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

function hideResult(){
  alert('Hi');
  if(inResults == true){
    $("#rewardImg").css("display","none");
    inResults = false;
  }
}

$(document).ready(function(){
  $("#rewardImg").on("click", function(){
    if(inResults == true){
      $("#rewardImg").css("display","none");
      inResults = false;
    }
  });
});