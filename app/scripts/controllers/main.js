'use strict';

app.controller('MainCtrl', function ($scope, $http, ngProgressFactory) {
  $scope.contained_progressbar = ngProgressFactory.createInstance();
  $scope.contained_progressbar.setParent(document.getElementById('demo_contained'));
  $scope.contained_progressbar.setAbsolute();
  $scope.start_contained = function($event) {
      $scope.contained_progressbar.start();
      $event.preventDefault();
  }

  $scope.complete_contained = function($event) {
      $scope.contained_progressbar.complete();
      $event.preventDefault();
  }

  $scope.reset_contained = function($event) {
      $scope.contained_progressbar.reset();
      $event.preventDefault();
  }

  $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append('files', files[0]);

    // var fd = new FormData()
    // for (var i in $scope.files) {
    //     fd.append("uploadedFile", $scope.files[i])
    // }
    var xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', uploadProgress, false)
    xhr.addEventListener('load', uploadComplete, false)
    xhr.addEventListener('error', uploadFailed, false)
    xhr.addEventListener('abort', uploadCanceled, false)
    xhr.open('POST', 'http://localhost:8080/fileupload')
    xhr.send(fd)
  };

  function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var progress = Math.round(evt.loaded * 100 / evt.total)
        $scope.contained_progressbar.set(progress);
    } else {
        console.log('unable to compute');
    }
  }
  function uploadComplete(evt) {
    console.log(evt.target.responseText)
  }
  function uploadFailed(evt) {
    console.log('There was an error attempting to upload the file.')
  }
  function uploadCanceled(evt) {
    $scope.contained_progressbar.reset();
    console.log('The upload has been canceled by the user or the browser dropped the connection.')
  }
});
