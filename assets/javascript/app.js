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


function timeAlogrithm(initialTrainTime, frequency) {
  // var currentTime = moment.Now();

  // var startTime = initialTrainTime;
  //
  // var minutesDifference = moment.convertToMinutes(currentTime - startTime);
  //
  // var timeUntilNextTrain = minutesDifference % frequency.val();
  //
  // var nextTrainArrivalTime = currentTime + moment.convertToMinutes(timeUntilNextTrain);

  // return nexTrainArrivalTime, timeUntilNextTrain;

};



// Button to add new schedule
$("#submit-button").on("click", function(event){
  event.preventDefault();

  // Store user input into variables
  var trainName = $("#train-name-input").val();
  var destination = $("#destination-input").val();
  var initialTrainTime = moment($("#first-train-time-input").val(), "hh:mm a, HH:mm").format("hh:mm a");
  console.log(initialTrainTime);
  var frequency = $("#frequency-input").val();
  
  // timeAlogrithm(initialTrainTime, frequency);

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
  console.log(newTrain);

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



})
  



}); // End of ready function


