console.log('Hello World');

var inquirer = require("inquirer");
var keys = require('./keys.js')

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var command = process.argv[2];
var query = process.argv[3];

//Spotify query
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
	twitter.get('statuses/user_timeline',function(err,tweets,response){
		if(err) {
			return console.log('Error occured: ' + err);
		}
		else {
		for(var i=0; i<tweets.length||i<19; i++){
			console.log(response.tweets);
			console.log("");
			console.log("-------------------------");
			console.log("");
		}
		}
	});
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








