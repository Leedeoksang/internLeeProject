'use strict';

describe('Directive: realtime', function () {

  // load the directive's module and view
  beforeEach(module('homeDashboardApp'));
  beforeEach(module('app/realtime/realtime.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<realtime></realtime>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the realtime directive');
  }));
});