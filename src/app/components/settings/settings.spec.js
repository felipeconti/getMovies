describe('settings component', function () {
  beforeEach(module('getMovies', function ($provide) {
    $provide.factory('settings', function () {
      return {
        templateUrl: 'app/settings.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<settings></settings>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
