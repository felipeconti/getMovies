var QUERY = process.argv[2] || ""

var YtsClient = require('yts-client');
var ytsClient = new YtsClient();

var selector = {
//     pageIndex: <number>, // [1, 50]
    // pageSize: 10,
    quality: '1080p', // 720p, 1080p, 3D
//     rating_min: <number>, // [0, 9]
    term: 'tt3498820', // match with name, actorm director
//     genre: <string>,
//     sort_by: <string>,
//     order_by: <string>, // desc, asc
};

ytsClient.find(selector, function(err, items) {
    if (err) return console.log(err.message);

    var movies = [];
  
    for (key in items) {
        var item  = items[key];
        var movie = {};

        movie.imdb_id  = item.imdb_id;
        movie.name     = item.name;
        movie.year     = item.year;
        movie.language = item.language;
        movie.posters = {
            sm: item.poster_sm,
            md: item.poster_md,
            lg: item.poster_lg
        };
        movie.torrents = item.torrents;

        movies.push(movie);
    };

    for (key in movies)
        console.dir(movies[key]);
});