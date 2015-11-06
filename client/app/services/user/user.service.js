'use strict';

angular.module('homeDashboardApp')
	.service('User', function (Util, OAUTH, $http, APIURL, $q) {
		var _this = this;

		this.construct = function () {
			this.uuid = undefined;
			this.accesstoken = undefined;
			this.refreshtoken = undefined;
			this.deviceStatus = 'NOT_REGISTERED';
			this.profile = {};
			this.status = undefined;
		};

		this.construct();

		this.login = function (credentials, next) {
			var status,
				deferred = $q.defer();

			credentials.app_version = 'web';

			$http({
				method: 'POST',
				url: OAUTH.tokenUrl,
				headers: {
					'Authorization': Util.encodeAuthHeader.basic(OAUTH.clientId, OAUTH.clientSecret)
				},
				data: {
					grant_type: 'password',
					credentials: credentials
				}
			}).success(function (response) {
				_this.accesstoken = response.access_token;
				_this.refreshtoken = response.refresh_token;
				next();
				deferred.resolve();
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		this.requestProfile = function () {
			var accesstoken = this.accesstoken,
				deferred = $q.defer();

			$http({
				method: 'GET',
				url: APIURL.profileUrl,
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				},
				params: {
					app_version: 'web'
				}
			}).success(function (response) {
				_this.profile = response;
				deferred.resolve();
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		this.requestUUID = function () {
			var accesstoken = this.accesstoken,
				deferred = $q.defer();

			$http({
				method: 'GET',
				url: OAUTH.uuidUrl,
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				}
			}).success(function (response) {
				_this.uuid = response.uuid;
				deferred.resolve();
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		this.requestDeviceStatus = function () {
			var uuid = this.uuid,
				accesstoken = this.accesstoken,
				deferred = $q.defer();

			$http({
				method: 'GET',
				url: APIURL.deviceStatusUrl(uuid),
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(accesstoken)
				}
			}).success(function (response) {
				_this.deviceStatus = response.status;
				deferred.resolve();
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};

		this.requestStatus = function () {
			var uuid = this.uuid,
				deferred = $q.defer();

			$http({
				method: 'GET',
				url: APIURL.siteInfoUrl(uuid),
				headers: {
					'Authorization': Util.encodeAuthHeader.bearer(this.accesstoken),
					'Content-Type': 'application/json'
				}
			}).success(function (response) {
				_this.status = response;
				deferred.resolve();
			}).error(function (error) {
				deferred.reject(error);
			});

			return deferred.promise;
		};



	});
