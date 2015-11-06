'use strict';

describe('Controller: IntroMainCtrl', function () {

  // load the controller's module
  beforeEach(module('homeDashboardApp'));

  var IntroMainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroMainCtrl = $controller('IntroMainCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
