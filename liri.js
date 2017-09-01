var fs = require('fs');
var keys = require('./keys.js')

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

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

var movies = new request;

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
			console.log('Posted on: ' + tweets[i].created_at);
			console.log("");
			console.log("-------------------------");
			console.log("");
		}
		}
	});
}


if(command === 'movie-this') {
			movies.get('http://www.omdbapi.com/?t='+query+'&apikey=40e9cece', function (err, response, body) {
				if(err){
					console.log('error:', error);
				}
				else {
				console.log('Title: ', response.Title);
				console.log('Year: ', response.Year);
				console.log('IMDB Rating: ', response.Ratings[0].Value);
				console.log('Rotten Tomatoes: ', response.Ratings[1].Value);
				console.log('Country: ', response.Country);
				console.log('Language: ', response.Language);
				console.log("-------------------------");
				console.log('Plot: ', response.Plot);
				console.log("-------------------------");
				console.log('Actors: ', response.Actors);
				}
			})
}

// }

// if (command === 'do-what-it-says') {
//   argument = './random.txt';
//   fs.readFile(argument, 'utf8', (err, data) => {
//     if (err) throw err;
//     var commands = data.trim().split('\n');
//     for (var c in commands) {
//       args = commands[c].trim().split(' ');
//       command = (args.shift() || '').toLowerCase();
//       argument = args.join(' ');
//       if (command) checkCommand();
//     }
//   });
// }


// do what it says function {
// 	read text from random.txt to run one of the other commands
// }








