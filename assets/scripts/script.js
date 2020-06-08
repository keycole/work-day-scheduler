$(document).ready(function() {
var submit = document.getElementsByTagName("button");

//Momentjs setup
var now = moment().format('MMMM DD, YYYY');

//add current date to '#currentDay' p
$("#currentDay").text(now);

//hours array used for dynamic text block creation
var hourArray = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

//Dynamically create text blocks
    //Use local storage to populate the textarea elements
function dynamicCalCreation() {
    for (var i = 0; i < hourArray.length; i++) {
        var row = $("<div>")
        $(row).attr({ class: "row", id: "row" + (i + 1) });
        $(".container").append(row);
        var hour = $("<div>");
        $(hour).attr({ class: "hour col-1", id: 9 + i }).css("color", "#03353e").text(hourArray[i]);
        var description = $("<div>");
        $(description).attr("class", "description col-10");
        var descriptionRow = $("<div>").attr({ class: "row", id: "description" + (i + 1) });
        $(description).append(descriptionRow);
        //Populate calendar cells with saved items
        var textArea = $("<textarea>").attr({ class: "col-12", id: "textareabutton" + (i + 1) }).css("color", "#ffffff").text(localStorage.getItem("myEventbutton" + (i + 1)));
        $(descriptionRow).append(textArea);
        var saveBtn = $("<button>");
        $(saveBtn).attr({ class: "saveBtn col-1 flex-nowrap", id: "button" + (i + 1) }).text("SAVE");
        $(row).append(hour, description, saveBtn);
    };
};

dynamicCalCreation();

//Add Calendar Events to local storage
$("button").click(function () {
    event.preventDefault();
    var currentID = $(this).attr('id')
    var toStore = $(("#textarea" + currentID)).val();
    localStorage.setItem(("myEvent" + currentID), toStore);
});

//Check relative time
function checkTime() {
    for (var i = 0; i < hourArray.length; i++) {
        var calTime = moment().hour(9 + i);
        if (moment().isBefore(calTime)) {
            $("#description" + (i + 1)).addClass("future");
        } else if (moment().isAfter(calTime)) {
            $("#description" + (i + 1)).addClass("past");
        } else {
            $("#description" + (i + 1)).addClass("present");
        }
    };
};

checkTime();

//Function to clear calendar contents before the start of the next day
    //Issue: Browser needs to be open in order for this to work.
    //If the browser window is closed before 11:50PM on the current day and opened the next
    //the textarea contents will not be emptied.
function clearCal() {
    var clearTime = moment().hour(23).minute(50);
    if (moment().isSameOrAfter(clearTime)) {
        for (var i = 0; i < hourArray.length; i++) {
            localStorage.clear();
        };
    };
};

clearCal();

//Function to auto refresh the page every 60 seconds
//This ensures that the color coding updates promptly.
function refresh(){
    setTimeout(function() {
        location.reload();
      }, 60000);
};

refresh();

//dom ready close
});