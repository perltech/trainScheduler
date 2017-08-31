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
  var initialTrainTime = $("#first-train-time-input").val(); // Invoke moment to change to correct time in case of military input
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


  // Clear out the inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("")
  $("#frequency-input").val("");
  
  


});
  

}); // End of ready function


