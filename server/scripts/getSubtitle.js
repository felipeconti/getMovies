var FILEPATH = process.argv[2] || ""
var QUERY;

var OpenSubtitles = require('opensubtitles-api');
var OS = new OpenSubtitles('OSTestUserAgent');

var fs = require('fs');

var SEARCH = {
    sublanguageid: "br",
    gzip: true
}
var isFile;
try {
    isFile = fs.statSync(FILEPATH).isFile;    
} catch(err) {
    isFile = false;
}

if (isFile) {
    SEARCH.path = FILEPATH;
} else {
    SEARCH.query = FILEPATH;
    FILEPATH = process.argv[3] || __dirname;
}

OS.search(SEARCH).then(function (subtitles) {
    if (subtitles.pb) {
        console.log('Subtitle found:', subtitles.pb);
        require('request')({
            url: subtitles.pb.url,
            encoding: null
        }, function (error, response, data) {
            if (error) throw error;

            require('zlib').unzip(data, function (error, buffer) {
                if (error) throw error;

                var Iconv = require('iconv').Iconv;
                var conv = new Iconv(subtitles.pb.encoding, 'UTF-8');
                var subtitle_content = (conv.convert(buffer)).toString('utf8');

                if (FILEPATH.substring(FILEPATH.length-3, FILEPATH.length-4) == ".")
                    var fileStr = FILEPATH.substring(0, FILEPATH.length-3) + "srt"
                else
                    var fileStr = FILEPATH + "/"+SEARCH.query+".srt";

                require('fs').writeFile(fileStr, subtitle_content, (err) => {
                    if (err) throw err;
                    console.log('It\'s saved!');
                });
            });
        });
    } else {
        throw 'no subtitle found';
    }
}).catch(function (error) {
    console.error(error);
});