describe('about component', function () {
  beforeEach(module('getMovies', function ($provide) {
    $provide.factory('about', function () {
      return {
        templateUrl: 'app/about.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<about></about>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
