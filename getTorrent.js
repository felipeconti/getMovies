var MAGNET = process.argv[2] || ""
var FOLDER = process.argv[3] || "../tmp"

if (MAGNET.indexOf("magnet:") <= 0) {
	var torrentToMagnet = require('torrent-to-magnet');

	torrentToMagnet(MAGNET, function (err, uri) {
		if (err) console.log(err);

		getTorrent(uri);
	});
} else {
	getTorrent(MAGNET);
}

var getTorrent = function (magnet) {
	var opts = {
		connections: 50,     // Max amount of peers to be connected to.
		uploads: 2,          // Number of upload slots.
		tmp: '/tmp',          // Root folder for the files storage.
								// Defaults to '/tmp' or temp folder specific to your OS.
								// Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
		path: FOLDER, // Where to save the files. Overrides `tmp`.
		verify: true,         // Verify previously stored data before starting
								// Defaults to true
		dht: true,            // Whether or not to use DHT to initialize the swarm.
								// Defaults to true
		tracker: true         // Whether or not to use trackers from torrent file or magnet link
								// Defaults to true
	}

	var torrentStream = require('torrent-stream');
  var progress = require('progress-stream');
  var numeral = require('numeral');

	var engine = torrentStream(magnet, opts);

	engine.on('ready', function() {
		engine.files.forEach(function(file) {
			file.deselect();

			console.log('filename: %s | length: %s', file.name, numeral(file.length).format('0 b'));
			if ( (file.name.search(".mp4") + file.name.search(".mkv") ) > 0 ) {
				var stream = file.createReadStream();

        var str = progress({
          time: 100,
          speed: 20,
          drain: true,
          length: file.length
        });
        str.on('progress', function(progress) {
          console.log("%s | Progress: %s % | Speed: %s/s | Running: %s (%s) | Left: %s (%s)",
                      file.name,
                      (progress.percentage).toFixed(2),
                      numeral(progress.speed).format('0.00 b'),
                      numeral(progress.runtime).format('00:00:00'),
                      numeral(progress.transferred).format('0 b'),
                      numeral(progress.eta).format('00:00:00'),
                      numeral(progress.remaining).format('0 b')
                     );
        });
        stream.pipe(str);

				stream.on('end', function() {
					console.log("%s | Baixou tudo!", file.name);
				});
			};
		});
	});

// 	engine.on('download', function(p1, p2) {
//     console.log("%s, %s: %s",
//                 p1,
//                 numeral(p2.length).format('0 b'),
//                 numeral(engine.swarm.downloaded).format('0 b'));
// 	});

	engine.on('idle', function () {
		engine.destroy(function () {
			console.log("Destroying...");
// 			engine.remove(function(){
// 				console.log("Removing...");
// 			});
		});
	});
};