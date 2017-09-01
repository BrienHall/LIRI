var fs = require('fs');
var keys = require('./keys.js')

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

var command = process.argv[2];
var query = process.argv[3];

var trim = require('trim');

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


function App () {
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
		twitter.get('statuses/user_timeline', user, function(err, tweets, response){
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
		var url = 'https://www.omdbapi.com/?apikey=40e9cece&t=';
			if (!query || query.length <= 0) {
				url += 'Mr. Nobody';
			} else {
				url += query;
				}
				request(url, function (err, response, body) {
					if (err) {
						console.log("Error: " + err);
					} else {
						var body = JSON.parse(body);
						console.log('Title: ', body.Title);
						console.log('Year: ', body.Year);
						console.log('IMDB Rating: ', body.Ratings[0].Value);
						console.log('Rotten Tomatoes: ', body.Ratings[1].Value);
						console.log('Country: ', body.Country);
						console.log('Language: ', body.Language);
						console.log("-------------------------");
						console.log('Plot: ', body.Plot);
						console.log("-------------------------");
						console.log('Actors: ', body.Actors);
					}

				});

	}

	if (command === 'do-what-it-says') {
	  filecommand = './random.txt';
	  fs.readFile(filecommand, function (err, data) {
	    if (err) {
			console.log("Error: " + err);
		} else {
	    	var commands = data.toString().split(",");
	    	command = commands[0];
	    	query = commands[1];
	    	App(this.command, this.query)
		}
	  });
	}
}

App(command, query);









