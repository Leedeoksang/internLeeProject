'use strict';

angular.module('homeDashboardApp')
	.controller('IntroMainCtrl', function ($scope, User, Util, $state) {
		$scope.loginData = {
			id: undefined,
			password: undefined
		};

		$scope.login = function () {
			var credetials = {};

			if ($scope.loginData.id && $scope.loginData.password) {
				if ($scope.loginData.id.indexOf('@') > -1) {
					credetials.email = $scope.loginData.id;
					credetials.password = $scope.loginData.password;
				} else {
					credetials.phone = $scope.loginData.id;
					credetials.password = $scope.loginData.password;
				}

				User.login(credetials, function () {
					return User.requestProfile();
				})

				.then(function () {
					return User.requestUUID();
				})

				.then(function () {
					return User.requestDeviceStatus();
				})

				.then(function () {
					storeUserData();
					$state.go('main');
				})

				.catch(function (error) {
					console.log(error);
				});

			}
		};

		function storeUserData () {
			var userData = User,
				tempData = {
					accesstoken: userData.accesstoken,
					refreshtoken: userData.refreshtoken,
					deviceStatus: userData.deviceStatus,
					profile: userData.profile,
					status: userData.status,
					uuid: userData.uuid
				};
			Util.localStorage.setObject('userData', tempData);
		};
	});
