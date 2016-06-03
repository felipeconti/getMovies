var torrentStream = require('torrent-stream');

// var magnet = process.argv[2] || "magnet:?xt=urn:btih:632613270a1d1f66429ca070c9ed5cb980357471&dn=London%20Has%20Fallen%20%282016%29%20%5B1080p%5D%20%5BYTS.AG%5D"
var magnet = process.argv[2] || "magnet:?xt=urn:btih:630f4110a2c591980dcff9fdc990db966231deef&dn=Modern.Family.S06E21.HDTV.x264-LOL%5Brartv%5D&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce"

var opts = {
	connections: 100,     // Max amount of peers to be connected to.
	uploads: 10,          // Number of upload slots.
	// tmp: '/tmp',          // Root folder for the files storage.
						  // Defaults to '/tmp' or temp folder specific to your OS.
						  // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
	// path: '/tmp/my-file', // Where to save the files. Overrides `tmp`.
	verify: true,         // Verify previously stored data before starting
						  // Defaults to true
	dht: true,            // Whether or not to use DHT to initialize the swarm.
						  // Defaults to true
	tracker: true         // Whether or not to use trackers from torrent file or magnet link
						  // Defaults to true
}

var engine = torrentStream(magnet, opts);

engine.on('ready', function() {
	engine.files.forEach(function(file) {
		console.log('filename:', file.name);
		var stream = file.createReadStream();

		stream.on('data', function (trunk) {
			console.log("%s | Trunk: %s", file.name, trunk.length);
		});

		stream.on('end', function() {
			console.log("%s | Baixou tudo!", file.name);
		});
	});
});

// engine.on('download', function(p1, p2) {
//     console.log("%s, %s: %s", p1, p2.length, engine.swarm.downloaded);
// });

engine.on('idle', function () {
	engine.destroy(function () {
		console.log("Destroying...");
		engine.remove(function(){
			console.log("Removing...");
		});
	});
});