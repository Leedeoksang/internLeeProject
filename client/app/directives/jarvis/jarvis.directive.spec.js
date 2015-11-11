'use strict';

describe('Directive: jarvis', function () {

  // load the directive's module and view
  beforeEach(module('homeDashboardApp'));
  beforeEach(module('app/directives/jarvis/jarvis.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<jarvis></jarvis>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the jarvis directive');
  }));
});