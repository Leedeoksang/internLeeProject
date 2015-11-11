'use strict';

describe('Directive: panel', function () {

  // load the directive's module and view
  beforeEach(module('homeDashboardApp'));
  beforeEach(module('app/directives/panel/panel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<panel></panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the panel directive');
  }));
});