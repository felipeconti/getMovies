angular
  .module('getMovies')
  .component('main', {
    templateUrl: 'app/main.html',
    controller: ControllerMain
  });

function ControllerMain($scope, $http, $document, $log, ngProgressFactory) {
  this.hello = 'Hello World!';

  this.file = {};

  this.log = $log.log;

  this.containedProgressbar = ngProgressFactory.createInstance();
  this.containedProgressbar.setParent($document[0].getElementById('demo_contained'));
  this.containedProgressbar.setAbsolute();
}

ControllerMain.prototype = {
  startContained: function () {
    this.containedProgressbar.start();
  },
  completeContained: function () {
    this.containedProgressbar.complete();
  },
  resetContained: function () {
    this.containedProgressbar.reset();
  },
  uploadFile: function () {
    var _this = this;
    var fd = new FormData();

    // Take the first selected file
    fd.append('file', _this.file);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', uploadProgress, false);
    xhr.addEventListener('load', uploadComplete, false);
    xhr.addEventListener('error', uploadFailed, false);
    xhr.addEventListener('abort', uploadCanceled, false);
    xhr.open('POST', 'http://localhost:8080/fileupload');
    xhr.send(fd);

    _this.containedProgressbar.start();

    function uploadProgress(evt) {
      if (evt.lengthComputable) {
        var progress = Math.round(evt.loaded * 100 / evt.total);
        _this.containedProgressbar.set(progress);
      } else {
        _this.log('unable to compute');
      }
    }
    function uploadComplete(evt) {
      _this.containedProgressbar.complete();
      _this.log(evt.target.responseText);
    }
    function uploadFailed() {
      _this.containedProgressbar.reset();
      _this.log('There was an error attempting to upload the file.');
    }
    function uploadCanceled() {
      _this.containedProgressbar.reset();
      _this.log('The upload has been canceled by the user or the browser dropped the connection.');
    }
  }
};
