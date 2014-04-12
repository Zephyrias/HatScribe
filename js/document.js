//=============================================================
// Code related to the document (settings and modals included) go here.
//=============================================================


//-------------------------------------------------------------
// Global variables
//-------------------------------------------------------------

// This is used to determine whether or not a user just started the program.
var docStart = true;		

// These store the paper length number and unit, saved from settings.
var questType = "Words";
var questNum = 0;

// This stores the maximum number of "questType" typed so far
var maxCount = 0;

//-------------------------------------------------------------
// Event Binding
//-------------------------------------------------------------
$(function(){
	// This allows you to press enter to submit the settings form
	// while an input is selected (eg. AFter filling out a form)
  $("#settingsModal input").keydown(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        changeSettings(this.form)
    }
  });
})


$(function(){
	// This attaches the load file handling to the appropriate buttons.
  document.getElementById('loadFile').addEventListener('change',handleFileSelect,false);
  document.getElementById('loadButton').addEventListener('change',handleFileSelect,false);

  $('input[type=file]').bootstrapFileInput();
  $('.file-inputs').bootstrapFileInput();
});


$(function(){
	// This controls the progress tracking, updating the word/paragraph count
  $('#textEditorTextArea').keyup(function(){
    var wordCount = 0;
    var paragraphCount = 0;
    var startsAndFinishes = $('#'+this.id).val().match(/\b/g);
    var newlinesWithText = $('#'+this.id).val().match(/(\n.)|(^.)/g);
    if (startsAndFinishes) {
      wordCount = startsAndFinishes.length / 2;
    }
    if (newlinesWithText) {
        paragraphCount = newlinesWithText.length;
      }

    var statement = "<strong>Goal: </strong>" + questNum + " " + questType;
    $('#goal').html(statement);

    var countType;
    if (questType == "Words")
    {
      countType = wordCount;
    }
    else if (questType == "Paragraphs")
    {
      countType = paragraphCount;
    }
    else if (questType == "Pages")
    {
      countType = 0;
    }

    statement = "<strong>Progress: </strong>" + countType + " " + questType;
    if (countType == 1)
      statement = statement.substring(0, statement.length - 1);
    $('#counts').html(statement);

    if(maxCount < countType){
      if(questType == "Words"){
        addExp(countType - maxCount);
      }
      else if (questType == "Paragraphs"){
        //This will need tweaking. 100 words/para
        addExp(100*(countType - maxCount));
      }
      else{
        //Also tweaking. 400 words/page
        addExp(400*(countType - maxCount));
      }
      maxCount = countType;
    }
  });
});


//-------------------------------------------------------------
// Helper Functions
//-------------------------------------------------------------
function changeSettings(form){
	// This takes the form values from the document settings page
	// and sets the appropriate elements in the document to match
	// those values. 
	// This also resizes the top of the textarea to match the
	// size of the "jumbotron" (document title area) in case
	// the title is multiple lines.
  if (form.docName.value != "")
  {
    document.getElementById("documentTitle").innerHTML = form.docName.value;
  }
  else
  {
    document.getElementById("documentTitle").innerHTML = "Untitled";
  }
  if (form.docAuthor.value != "")
  {
    $("#documentBy").show();
    document.getElementById("documentAuthor").innerHTML = form.docAuthor.value;
  }
  else
  {
  	$("#documentBy").hide();
  	document.getElementById("documentAuthor").innerHTML = "";
  }

  if (form.lengthNum.value != "")
  {
    questType = form.lengthType.value;
    questNum = form.lengthNum.value;
    $('#countsDiv').show();

    var statement = "<strong>Goal: </strong>" + questNum + " " + questType;
    $('#goal').html(statement);
  }
  else
	{
		$('#countsDiv').hide();
	}  	

  $("#textEditorTextArea").css("top", $('#documentSection').css("height"));

  if (docStart){docStart = false;}

  redirect('#close');
  return false;
}


function cancel(){
	// This controls which modal the cancel button redirects you to
  if (!docStart)
  {
    redirect('#menuModal');
  }
  else
  {
    redirect('#startModal');
  }
}


function newDoc(){
	// This clears all of the form values and changes the title of the
	// settings menu, as well as what the buttons are labeled on that page.
  document.getElementById("settingsTitle").innerHTML = "New Document";
  $('#initButton').attr("type", "button");
  $('#cancelButton').attr("type", "button");
  $('#changeButton').attr("type", "hidden");
  $("#docName").val("");
  $("#docAuthor").val("");
  $("#lengthNum").val("");
  $("#lengthType").val("Words");
  document.getElementById("textEditorTextArea").value="";
  redirect('#settingsModal');
}

function oldDoc(){
	// This ensures that all of the form values match what is on the document
	// (in case they were cleared from newDoc()). This also changes the
	// title and button labels to what makes sense.
  document.getElementById("settingsTitle").innerHTML = "Edit Document Settings";
  $('#initButton').attr("type", "hidden");
  $('#changeButton').attr("type", "button");
  $('#cancelButton').attr("type", "button");
  $("#docName").val(document.getElementById("documentTitle").innerHTML);
  $("#docAuthor").val(document.getElementById("documentAuthor").innerHTML);
  $("#lengthNum").val(questNum);
  $("#lengthType").val(questType);
  redirect('#settingsModal');
}


function handleFileSelect(evt){
	// This handles the load document functionality.
	// The HTML and this code currently only handle .txt files.
	// This code puts the value of the file as the document content
	// and uses the name of the file as the title
  var files = evt.target.files;
  var file = files[0];

  var fileName = file.name;
  // This line assumes that we're using a .txt file
  document.getElementById("documentTitle").innerHTML = fileName.substring(0, fileName.length - 4);
  $("#textEditorTextArea").css("top", $('#documentSection').css("height"));

  var reader = new FileReader();
  reader.onload = readFile;
  reader.readAsText(file);

  function readFile(){
   var words = reader.result;
   document.getElementById("textEditorTextArea").value = words;
   redirect("#close");
  }
}