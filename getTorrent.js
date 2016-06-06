var magnet = process.argv[2] || ""

if (magnet.indexOf("magnet:") <= 0) {
	var torrentToMagnet = require('torrent-to-magnet');
 
	torrentToMagnet(magnet, function (err, uri) {
		if (err) console.log(err);

		getTorrent(uri);
	});
} else {
	getTorrent(magnet);
}

var getTorrent = function (magnet) {
	var opts = {
		connections: 100,     // Max amount of peers to be connected to.
		uploads: 10,          // Number of upload slots.
		// tmp: '/tmp',          // Root folder for the files storage.
								// Defaults to '/tmp' or temp folder specific to your OS.
								// Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
		path: '../tmp', // Where to save the files. Overrides `tmp`.
		verify: true,         // Verify previously stored data before starting
								// Defaults to true
		dht: true,            // Whether or not to use DHT to initialize the swarm.
								// Defaults to true
		tracker: true         // Whether or not to use trackers from torrent file or magnet link
								// Defaults to true
	}

	var torrentStream = require('torrent-stream');
	var engine = torrentStream(magnet, opts);

	engine.on('ready', function() {
		engine.files.forEach(function(file) {
			file.deselect();
			file.uploadedSize = 0;

			console.log('filename: %s | length: %s', file.name, formatBytes(file.length));
			if ( (file.name.search(".mp4") + file.name.search(".mkv") ) > 0 ) {
				var stream = file.createReadStream();

				stream.on('data', function (trunk) {
					file.uploadedSize += trunk.length;

					console.log("%s | Progress: %s %", file.name, ((file.uploadedSize/file.length*100).toFixed(2)));
				});

				stream.on('end', function() {
					console.log("%s | Baixou tudo!", file.name);
				});
			};
		});
	});

	// engine.on('download', function(p1, p2) {
	//     console.log("%s, %s: %s", p1, formatBytes(p2.length), formatBytes(engine.swarm.downloaded));
	// });

	engine.on('idle', function () {
		engine.destroy(function () {
			console.log("Destroying...");
			engine.remove(function(){
				console.log("Removing...");
			});
		});
	});

	function formatBytes(bytes,decimals) {
		if(bytes == 0) return '0 Byte';
		var k = 1000; // or 1024 for binary
		var dm = decimals + 1 || 3;
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
};