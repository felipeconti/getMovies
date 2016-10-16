angular
  .module('getMovies')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      component: 'main'
    })
    .state('settings', {
      url: '/settings',
      component: 'settings'
    })
    .state('about', {
      url: '/about',
      component: 'about'
    });
}
