'use strict';

angular.module('homeDashboardApp')
	.service('realtimeModel', function ($q, api, User, Util) {
		var siteHash = User.uuid ? User.uuid : Util.localStorage.getObject('userData').uuid;
		
		function getModel () {
			var deferred = $q.defer();
			
			api.getRealtimeUsage(siteHash).then(function (response) {
				var model = {
					power: response.activePower / 1000
				};
				deferred.resolve(model);
			});
			return deferred.promise;
		}

		return {
			getModel: getModel
		};	
	});
