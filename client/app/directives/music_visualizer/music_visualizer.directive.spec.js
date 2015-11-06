'use strict';

describe('Directive: musicVisualizer', function () {

  // load the directive's module and view
  beforeEach(module('homeDashboardApp'));
  beforeEach(module('app/directives/music_visualizer/music_visualizer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<music-visualizer></music-visualizer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the musicVisualizer directive');
  }));
});