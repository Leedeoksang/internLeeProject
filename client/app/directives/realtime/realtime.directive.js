'use strict';

angular.module('homeDashboardApp')
  	.directive('realtime', function (realtimeModel, User, Util, $interval) {
    	return {
      		templateUrl: 'app/directives/realtime/realtime.html',
      		restrict: 'EA',
      		link: function (scope, element, attrs) {
      			var siteHash = User.uuid ? User.uuid : Util.localStorage.getObject('userData').uuid;

      			scope.init = function () {
              scope.realtimeInterval = $interval(function () {
                realtimeModel.getModel(siteHash).then(function (response) {
                });
              }, 2000);
      			};

      			scope.init();
      		}
    	};
  	});