'use strict';

angular.module('homeDashboardApp')
	.service('Util', function ($window) {

		this.encodeAuthHeader = {
			basic: function (clientId, clientSecret) {
				return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
			},
			bearer: function (accesstoken) {
				return 'Bearer ' + accesstoken;
			}
		};

		this.localStorage = {
			get: function (key) {
				return $window.localStorage[key];
			},
			set: function (key, value) {
				$window.localStorage[key] = value;
			},
			getObject: function (key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			setObject: function (key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			}
		}
		
	});
