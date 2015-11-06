'use strict';

angular.module('homeDashboardApp')
	.service('realtimeModel', function ($q, api) {
		var deferred = $q.defer();

		function getModel (siteHash) {
			var deferred = $q.defer();

			api.getRealtimeUsage(siteHash).then(function (response) {
				deferred.resolve(response);
			});
			return deferred.promise;
		}

		return {
			getModel: getModel
		};	
	});
