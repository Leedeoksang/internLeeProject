'use strict';

angular.module('homeDashboardApp')
  .directive('musicEditor', function () {
    return {
      templateUrl: 'app/directives/music_editor/music_editor.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });