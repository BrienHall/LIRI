console.log('Hello World');

var inquirer = require("inquirer");
var keys = require('./keys.js')

var Spotify = require('node-spotify-api');

var query = process.argv[2];

//Spotify query
var spotify = new Spotify({
	id: keys.spotifyKeys.id,
	secret: keys.spotifyKeys.secret
});

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




