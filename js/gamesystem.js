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

//Used to keep track of current level
var curLevel = 1

//Used to keep track of current exp
var curExp = 0

//Used to keep track of exp until next level
var maxExp = 50

var hatLimit = 1;
var hatCount = 0; // Start with 0 hats :<

//The current number of hat images
var NUMHATS = 16;

//The max number of hats to be stacked
var maxHats = 8;

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

$(function() {  
  $("#topInventory img").draggable({
    appendTo: "body",
    helper: "clone"
  });

  var counter = 0;
  var removeIntent = false;
  var grabbingExisting = false;
  $(".droppable").droppable({
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    placeholder: "ui-state-placeholder",
    over: function(event, ui){
      if (counter == hatLimit && !grabbingExisting)
        $(ui.helper).css("background", "red");
        $(ui.helper).css("opacity", 0.6);
    },
    accept: ":not(.ui-sortable-helper)",
    drop: function(event, ui){
      $(this).find(".placeholder").remove();
      if (counter != hatLimit && !grabbingExisting)
      {
        var img = document.createElement('img');
        img.src = ui.draggable[0].src;
        img.className = "itemList";
        $(this).append(img);
        counter = counter + 1;
        var looper = 0;
        var list = document.getElementById("bottomInventory").childNodes;
        while(looper < counter){
          var img = list.item(looper+1).src;
          $("#hat" + looper).attr("src",img).css("display","block");
          looper = looper + 1;
        }
        while(looper < maxHats){
          $("#hat" + looper).css("display","none");
          looper=looper+1;
        }
      }
    }
  }).sortable({
    items: "img:not(.placeholder)",
    over: function() {
      removeIntent = false;
      grabbingExisting = true;
    },
    out: function () {
      removeIntent = true;
      grabbingExisting = false;
    },
    beforeStop: function (event, ui) {
      if(removeIntent)
      {
        ui.item.remove();
        counter = counter - 1;

      }
    },
    stop: function (event, ui) {
        var looper = 0;
        var list = document.getElementById("bottomInventory").childNodes;
        while(looper < counter){
          var img = list.item(looper+1).src;
          $("#hat" + looper).attr("src",img).css("display","block");
          looper = looper + 1;
        }
        while(looper < maxHats){
          $("#hat" + looper).css("display","none");
          looper=looper+1;
        }
    },
    sort: function() {
      grid:[100,100],
      $(this).removeClass("ui-state-default");

    },
    helper: "clone",
    appendTo: "body",
    zIndex: 10000
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
    numStars = numStars + value;
    var tempArray = document.getElementsByName('numStars');
    for(var i = 0; i < tempArray.length;i++)
    {
      tempArray[i].innerHTML = numStars;
    }
    if(numStars > 0){
      $("#gambleButton").attr("disabled", false);
      $("#breakButton").attr("disabled", false);
    }
  }
  else if(type=="Hat"){
    //The +1 is because the hat files are from 1-20
    val = Math.floor(Math.random()*NUMHATS + 1);
    if (val == 0)
      val = 1;
    image="hats/" + val + ".png";
    message="You got a hat, dood!";
    addHat(image);
  }
  else if(type=="Level"){
    if(hatLimit < maxHats){
      hatLimit = hatLimit + 1;
    }
    var statement = "Limit: " + hatLimit;
    $('#hatLimit').html(statement);
    image="Level.png";
    message="You reached level " + value + ", dood!";
  }
  else{
    image="Quest.png";
    message="You just finished this document, dood!";
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

//
//EXP Related
//

function updateBars(){
  $("#level").text(curLevel);
  $("#curExp").text(curExp);
  $("#maxExp").text(maxExp);
  $("#progbar").css("width", 100*curExp/maxExp + "%");
}

function addExp(amount){
  while(amount > 0){
    curExp = curExp + 1;
    amount = amount - 1;
    if(curExp == maxExp){
      curLevel = curLevel + 1;
      curExp = 0;
      //Do some sorta function here
      maxExp = curLevel*curLevel + 50*curLevel - 1;
      addNotification("Level",curLevel);
    }
    updateBars();
  }
}
  
function addHat(image){
  var li = document.createElement('img');
  li.src = 'images/' + image;
  li.className = 'draggable itemList';
  $('#topInventory').append(li);
  $("#topInventory img").draggable({
    appendTo: "body",
    helper: "clone"
  });
  hatCount = hatCount + 1;
  var statement = "Hats: " + hatCount;
  $('#inventorySize').html(statement);
}
