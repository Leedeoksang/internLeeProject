'use strict';

describe('Directive: musicEditor', function () {

  // load the directive's module and view
  beforeEach(module('homeDashboardApp'));
  beforeEach(module('app/directives/music_editor/music_editor.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<music-editor></music-editor>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the musicEditor directive');
  }));
});