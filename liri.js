var dotEnv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var searchType = process.argv[2];
var value = process.argv.slice(3).join("").toLowerCase();
var valuePlus = process.argv.slice(3).join("+").toLowerCase();
var valueEscaped = escape(process.argv.slice(3).join(" ").toLowerCase());


var bit = function (value) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  request(queryUrl, function(error, response, body) {
  
    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body)[1].venue.name);
      console.log("\n Location: " + JSON.parse(body)[1].venue.city);
      console.log("\n Date: " + moment(JSON.parse(body)[1].venue.datetime).format("MM-DD-YYYY"));

    }
  });
}


var spot = function (valueEscaped) {
 
  var spotify = new Spotify(keys.spotify);
  // This line is just to help us debug against the actual URL.
  console.log("spotify key worked");


  spotify.search({ type: 'track', query: valueEscaped }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    //var stringified = JSON.stringify(data);
  console.log("Artist: " + data.tracks.items[0].artists[0].name);
  console.log("\n Song Name: " + data.tracks.items[0].name);
  console.log("\n Preview Link: " + data.tracks.items[0].preview_url);
  console.log("\n Album: " + data.tracks.items[0].album.name);


});

}





var omdb = function (valuePlus) {
  var queryUrl = "http://www.omdbapi.com/?t=" + valuePlus + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  request(queryUrl, function(error, response, body) {
  
    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("\n Year: " + JSON.parse(body).Year);
      console.log("\n IMDB: " + JSON.parse(body).imdbRating);
      console.log("\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("\n IMDB: " + JSON.parse(body).Country);
      console.log("\n IMDB: " + JSON.parse(body).Language);
      console.log("\n IMDB: " + JSON.parse(body).Plot);
      console.log("\n IMDB: " + JSON.parse(body).Actors);
    }
  });
}







if (searchType === "concert-this"){
    if (value == null){
      console.log("Artist or Band Name Not Entered")
    } else {bit(value);}


} else if (searchType ==="spotify-this-song"){
  if(value == null){
    spot("thesign");
  } else {spot(valueEscaped);}



} else if (searchType ==="movie-this"){

        if (value == null ) {
          omdb("mr.nobody");
        } else{omdb(valuePlus);}
        
  


} else if (searchType ==="do-what-it-says"){

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    var searchType = dataArr[0].trim();
    console.log(searchType);
    console.log(dataArr[1].trim().trim());
    
    var value = dataArr[1].trim().split(" ").join("").toLowerCase();
    var valuePlus = dataArr[1].trim().split(" ").join("+").toLowerCase();
    var valueEscaped = escape(dataArr[1].trim().split(" ").join(" ").toLowerCase());

    

    

    //repeat of all the 3 main if statements based on 1 concert 2 spotify 3 movie here


    if (searchType === "concert-this"){
      if (value == null){
        console.log("Artist or Band Name Not Entered")
      } else {bit(value);}
  
  
  } else if (searchType ==="spotify-this-song"){
    if(value == null){
      spot("thesign");
    } else {spot(valueEscaped);}
  
  
  
  } else if (searchType ==="movie-this"){
  
          if (value == null ) {
            omdb("mr.nobody");
          } else{omdb(valuePlus);}
          
    
  
  
  }



  
  });
  
} else { console.log ("Invalid Command");

}










