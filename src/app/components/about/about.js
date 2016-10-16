function aboutController() {
  this.text = 'My brand new component About!';
}

angular
  .module('getMovies')
  .component('about', {
    templateUrl: 'app/components/about/about.html',
    controller: aboutController
  });

