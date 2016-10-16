function settingsController() {
  this.text = 'My brand new component Settings!';
}

angular
  .module('getMovies')
  .component('settings', {
    templateUrl: 'app/components/settings/settings.html',
    controller: settingsController
  });

