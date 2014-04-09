//=============================================================
// Helper functions and code that affect the entire document goes here.
//=============================================================

//-------------------------------------------------------------
// Program set-up
//-------------------------------------------------------------

$(document).ready(function(){
  // Changes the window and document title to Hat Scribe, 
  // opens the startModal once everything loads
  console.log("am I here?");
  redirect('#startModal');
  window.title = "Hat Scribe";
  document.title = "Hat Scribe";
});


//-------------------------------------------------------------
// Helper Functions
//-------------------------------------------------------------
function redirect(string){
  // This allows you to change which mode is being viewed.
  // This is normally used for modal switching.
  window.location = string;
  if ($(string).css("display") == "none")
    $(string).show();
}

function clickItem(string){
  // This allows you to click on the object with the given ID.
  // This is currently being used for submitting hidden forms
  // when clicking on visible buttons (with the appropriate styling)
  $(string).click();
}