'use strict';

angular.module('homeDashboardApp')
	.service('api', function ($q, $http, User, Util, APIURL) {
		var accesstoken = User.accesstoken ? User.accesstoken : Util.localStorage.getObject('userData').accesstoken;

		function implementRequest (requestData) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + accesstoken,
					'Content-Type': 'application/json'
				},
				url: requestData.url,
				qs: requestData.qs ? requestData.qs : undefined,
				json: true
			}).success(function (response) {
				deferred.resolve(response);
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		return {
			getUserInfo: function (userId) {
				var deferred = $q.defer(),
					requestData = {};

				requestData.url = APIURL.userInfo(userId);
				requestData.qs = {};
				implementRequest(requestData).then(function (response) {
					deferred.resolve(response);
				});

				return deferred.promise;
			},
			getRealtimeUsage: function (siteHash) {
				var deferred = $q.defer(),
					requestData = {};

				requestData.url = APIURL.realtimeUsage(siteHash);
				implementRequest(requestData).then(function (response) {
					deferred.resolve(response);
				});

				return deferred.promise;
			},
			getMeteringUsage: function (siteHash) {
				var deferred = $q.defer(),
					requestData = {};

				requestData.url = APIURL.meteringUsage(siteHash);
				implementRequest(requestData).then(function (response) {
					deferred.resolve(response);
				});

				return deferred.promise;
			}
		};
	});
