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






// Button to add new schedule
$("#submit-button").on("click", function(event){
  event.preventDefault();

  // Store user input into variables
  var trainName = $("#train-name-input").val();
  var destination = $("#destination-input").val();
  var initialTrainTime = $("#first-train-time-input").val(); // Invoke moment to change to correct time in case of military input
  var frequency = $("#frequency-input").val();
  
  console.log(trainName);
  console.log(destination);
  console.log(initialTrainTime);
  console.log(frequency);

  var newTrain = {
    "name": trainName,
    "destination": destination,
    "first train time": initialTrainTime,
    "frequency": frequency 
  };

  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain["first train time"]);
  console.log(newTrain.frequency);

});
  

}); // End of ready function


