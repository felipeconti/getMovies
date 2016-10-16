describe('hello component', function () {
  beforeEach(module('getMovies', function ($provide) {
    $provide.factory('main', function () {
      return {
        templateUrl: 'app/main.html'
      };
    });
  }));
  it('should render hello world', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app>Loading...</app>')($rootScope);
    $rootScope.$digest();
    var h1 = element.find('h1');
    expect(h1.html()).toEqual('Hello World!');
  }));
});
