$( document ).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8FzTeekZspVqYG429gUhWJkOZe0n2sks",
  authDomain: "trainscheduler-608f9.firebaseapp.com",
  databaseURL: "https://trainscheduler-608f9.firebaseio.com",
  projectId: "trainscheduler-608f9",
  storageBucket: "",
  messagingSenderId: "844094080623"
};

firebase.initializeApp(config);

var database = firebase.database();

// Determine time until the next train and the arrival time
function timeAlogrithm(initialTrainTime, frequency) {
  // var currentTime = moment.Now();
  var currentTime = moment();
  // var startTime = initialTrainTime;
  var startTime = initialTrainTime;
  // var minutesDifference = moment.convertToMinutes(currentTime - startTime);
  var minutesDifference = moment().subtract(currentTime - startTime);
  // var timeUntilNextTrain = minutesDifference % frequency.val();
  var timeUntilNextTrain = minutesDifference % frequency;
  // var nextTrainArrivalTime = currentTime + moment.convertToMinutes(timeUntilNextTrain);
  var nextTrainArrivalTime = moment().add(currentTime + timeUntilNextTrain);
  // return nexTrainArrivalTime, timeUntilNextTrain;
  return nextTrainArrivalTime, timeUntilNextTrain
};

// Display values from schedule
function appendNewValues(sv) {
  var tr = $("<tr>");
  tr.append("<td>" + sv.name);
  tr.append("<td>" + sv.destination);
  tr.append("<td>" + sv.frequency);
  // tr.append(sv["next arrival"] + "<td>")
  // tr.append(sv["minutes away"] + "<td>") 
  $("table > tbody").append(tr);
};

// Button to add new schedule
$("#submit-button").on("click", function(event){
  event.preventDefault();

  // Store user input into variables
  var trainName = $("#train-name-input").val();
  var destination = $("#destination-input").val();
  var initialTrainTime = moment($("#first-train-time-input").val(), "hh:mm a, HH:mm").format("hh:mm a");
  var frequency = $("#frequency-input").val();
  
  timeAlogrithm(initialTrainTime, frequency);
  console.log(nextTrainArrivalTime, timeUntilNextTrain);

  // Do I have a scoping problem here when I'm making the object?
  // Store variables afer they've been put through the function
  var newTrain = {
    "name": trainName,
    "destination": destination,
    "frequency": frequency,
    // "next arrival": nextTrainArrivalTime,
    // "minutes away": timeUntilNextTrain
  };

  // Store new local object into firebase
  database.ref().push(newTrain);

  // Clear out the inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("")
  $("#frequency-input").val("");
});

// Create firebase event for adding train schedule to database and display new entries
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var sv = childSnapshot.val();

  var trainName = sv.name;
  var destination = sv.destination;
  var frequency = sv.frequency;
  // var nexTrainArrivalTime = sv["next arrival"];
  // var timeUntilNextTrain = sv["minutes away"];

  // Dynamically create table rows containing newly entered user values and display to table body
  appendNewValues(sv);

})
  

}); // End of ready function
