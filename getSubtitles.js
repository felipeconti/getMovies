var FILEPATH = process.argv[2] || ""

var OpenSubtitles = require('opensubtitles-api');
var OS = new OpenSubtitles('OSTestUserAgent');

OS.search({
    sublanguageid: "br",
    path: FILEPATH,
    gzip: true
}).then(function (subtitles) {
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
                
                var fileStr = FILEPATH.substring(0, FILEPATH.length-3) + "srt";

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