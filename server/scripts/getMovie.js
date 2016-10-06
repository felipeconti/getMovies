var kickass = require('kickass-torrent')
var QUERY = process.argv[2] || ""

kickass({
	q: QUERY,//actual search term
	// field:'seeders',//seeders, leechers, time_add, files_count, empty for best match
	order:'desc',//asc or desc
	page: 1,//page count, obviously
	url: 'https://kat.cr',//changes site default url (https://kat.cr)
},function(e, data){
	//will get the contents from
	//http://kickass.to/json.php?q=test&field=seeders&order=desc&page=2
	if(e) return console.log(e)

	// console.log(data)//actual json response
	console.log("\n");

	data.list.sort(function(a, b) {
		if (a.seeds < b.seeds)
			return -1
		else if (a.seeds > b.seeds)
			return 1
		else
			return 0;
	})

	if (data && data.list)
		data.list.forEach(function(torrent){
			console.log("Title: "+torrent.title);
			console.log("Peers: "+torrent.peers);
			console.log("Seeds: "+torrent.seeds);
			console.log("Link: "+torrent.torrentLink);
			console.log("\n");
		})
})