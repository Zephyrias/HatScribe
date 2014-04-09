//=============================================================
// Code related to the XP, leveling, and item system go here.
//=============================================================


//-------------------------------------------------------------
// Global variables
//-------------------------------------------------------------

// Used to keep track of which inventory page you're on
var currentPage = 1;

// Used to count the current number of notifications
var numNotifications = 0;

//-------------------------------------------------------------
// Event Binding
//-------------------------------------------------------------
$(function(){
  // This changes which direction the arrow on the inventory button is facing.
  // This also hides/shows the settings button and animates the page scroll
  // when the open/close inventory button is clicked. 
  $("#inventoryButton").click(function(){
    var divClass = $("#leftArrow").css("display");
    if(divClass == "none"){
      $("#mainBody").animate({left:'0%'}, function(){
        $("#leftArrow").show();
        $("#rightArrow").hide();
      });
      $("#settingsDiv").hide();
      $("#newNote").hide();
      document.getElementById("inventoryText").innerHTML = "Close Inventory";
    }
    else{
      $("#mainBody").animate({left:'-80%'}, function(){
        $("#settingsDiv").show();
        $("#newNote").show();
        $("#leftArrow").hide();
        $("#rightArrow").show();
      });       
      document.getElementById("inventoryText").innerHTML = "Open Inventory";
    }
  });
 });


//-------------------------------------------------------------
// Helper Functions
//-------------------------------------------------------------

//
// Inventory related
// 
function changePage(input)
{
  // This updates the pagination element with the correct
  // active and disabled elements when you scroll through.
  // The actual inventory doesn't scroll through as appropriate yet.
  $('#page' + currentPage).removeClass("active");
  if (input == "+1")
  {
    currentPage = parseInt(currentPage) + parseInt(1);
  }
  else if (input == "-1")
  {
    currentPage = parseInt(currentPage) - parseInt(1);
  }
  else
  {
    currentPage = input;
  }

  $('#page' + currentPage).addClass("active");
  console.log("Trying to toggle page " + currentPage);
  if (currentPage == 1)
  {
    $('#pageLeft').addClass("disabled");
    $('#pageRight').removeClass("disabled");
  }
  else if (currentPage == 5)
  {
    $('#pageRight').addClass("disabled");
    $('#pageLeft').removeClass("disabled");
  }
  else
  {
    $('#pageLeft').removeClass("disabled");
    $('#pageRight').removeClass("disabled");
  }
}


// 
// Notification related
//
function newNotification(){
	// Determines which type of notification gets added based on rng
  var val = Math.floor(Math.random()*3);
  if(val == 0){
    addNotification("XP", Math.floor(Math.random()*1000));
  }
  else if(val == 1){
    addNotification("Star", 0);
  }
  else{
    addNotification("Hat", 0);
  }
}

function addNotification(type, value){
	// Adds the image and text in the appropriate location
  var image, message;
  if(type=="XP"){
    image="XP.png";
    message="You got " + value + " experience, dood!";
  }
  else if(type=="Star"){
    image="StarReward.png";
    message="You got a star, dood!";
  }
  else{
    image="Hat.png";
    message="You got a hat, dood!";
  }
  var div= document.createElement('div');
  div.className = 'notificationBox';
  var img = document.createElement('img');
  img.className = 'notificationImage';
  img.src = "images/" + image;
  var text = document.createElement('div');
  text.className = 'notificationText';
  text.innerHTML = message;

  div.appendChild(img);
  div.appendChild(text);

  var noteBox = document.getElementById("notificationBoxes");
  if(numNotifications == 5){
    noteBox.removeChild(noteBox.childNodes[4]);
    numNotifications = 4;
  }
  noteBox.insertBefore(div,noteBox.firstChild);
  numNotifications++;
}

