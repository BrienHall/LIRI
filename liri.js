

var inquirer = require("inquirer");
var keys = require('./keys.js')

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var Movies = require('request');

var command = process.argv[2];
var query = process.argv[3];

var spotify = new Spotify({
	id: keys.spotifyKeys.id,
	secret: keys.spotifyKeys.secret
});

var twitter = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
})

var movies = new Movies({
	key: keys.omdbKeys.key
})

if(command === 'spotify-this-song') {
	spotify.search({type: 'track', query: query, limit: 5}, function(err, data) {
		if (err) {
	    return console.log('Error occurred: ' + err);
	  	}
	  	else {
		var songData = data.tracks.items[0];
		var songResult = ("Artist: " + songData.artists[0].name + "\nTrack: " + songData.name +
	    "\nAlbum: " + songData.album.name + "\nPreview: " + songData.preview_url + "\n----------");

		console.log(songResult);
		}
	});
}

if(command === 'my-tweets') {
	var user = {screen_name: 'DissentChannel'};
	twitter.get('statuses/user_timeline', user, function(err,tweets,response){
		if(err) {
			return console.log('Error occured: ' + err);
		}
		else {
		for(var i=0; i<tweets.length; i++){
			console.log(tweets[i].text);
			console.log('Posted - ' + tweets[i].created_at);
			console.log("");
			console.log("-------------------------");
			console.log("");
		}
		}
	});
}

if(command === 'movie-this') {
	request('http://www.omdbapi.com/?apikey='+ movies.key +'&t=' + query + '', function (err, response, body) {
	if(err){
		console.log('error:', error);
	}
	else { // Print the error if one occurred 
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	console.log('body:', body); // Print the HTML for the Google homepage. 
	}
}



// Twitter function {
// 	give me last 20 tweets with timestamps
// }


// movie function {
// 	for a given movie title
// 		 Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// }

// do what it says function {
// 	read text from random.txt to run one of the other commands
// }








