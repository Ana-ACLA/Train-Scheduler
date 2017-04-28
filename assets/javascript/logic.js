//first link firebase database from js to html
// 

var config = {
    apiKey: "AIzaSyDJX9v5ugagfGd_twdQJgcx8fFif1Pnscg",
    authDomain: "my-db-ae5d6.firebaseapp.com",
    databaseURL: "https://my-db-ae5d6.firebaseio.com",
    projectId: "my-db-ae5d6",
    storageBucket: "my-db-ae5d6.appspot.com",
    messagingSenderId: "301478405276"
};
  firebase.initializeApp(config);

var database = firebase.database();

var TrainName = "";
var Destination = "";
var FirstTrainTime = "";
var Frequency = "";

$("#add-train").on("click", function(event){
  event.preventDefault();

  TrainName = $("#TrainNameSubmitted").val().trim();
  Destination = $("#DestinationNameSubmitted").val().trim();
  var startTime = moment($("#FirstTrainTimeSubmitted").val().trim(), "HH:mm").subtract(10,"years").format("X");
  var Frequency = $("#FrequencySubmitted").val().trim();

  ///Console Log Test
  console.log(TrainName);
  console.log(Destination);
  console.log(startTime);
  console.log(Frequency);

  Frequency = $("#FrequencySubmitted").val().trim();

  database.ref().push({
    TrainName,
    Destination,
    startTime,
    Frequency,
  });
      // clear text-boxes
    $("#TrainNameSubmitted").val("");
    $("#lineInput").val("");
    $("#DestinationNameSubmitted").val("");
    $("#FirstTrainTimeSubmitted").val("");
    $("#FrequencySubmitted").val("");

    // Prevents page from refreshing
    return false;

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  ///Old Variables
  var startTime = moment($("#FirstTrainTimeSubmitted").val().trim(), "HH:mm").subtract(10,"years").format("X");
  var Frequency = childSnapshot.val().Frequency;
  var TrainNameData = childSnapshot.val().TrainName;
  var DestinationData = childSnapshot.val().Destination; 
  var FirstTrainTimeData = childSnapshot.val().startTime; 
  var FrequencyData = childSnapshot.val().Frequency; 

  ///New Variables
  var diffTime = moment().diff(moment.unix(FirstTrainTimeData), "minutes");
  var timeRemainder = moment().diff(moment.unix(FirstTrainTimeData), "minutes") % FrequencyData ;
  var minutes = FrequencyData - timeRemainder;
  //
  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  //
  var newRow = $("<tr>");
  var newName = $("<td>");
  newName.html(TrainNameData);
  var newDestination = $("<td>");
  newDestination.html(DestinationData);
  var newFrequency = $("<td>");
  newFrequency.html(Frequency);
  var newNextTrainArrival = $("<td>");
  newNextTrainArrival.html(nextTrainArrival);
  var newMinutes = $("<td>");
  newMinutes.html(minutes);  


  newRow.append(newName);
  newRow.append(newDestination);
  newRow.append(newFrequency);
  newRow.append(newNextTrainArrival);
  newRow.append(newMinutes);

  $("#squad-up").append(newRow);
});
