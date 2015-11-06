'use strict';

angular.module('homeDashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/views/main/main.html',
        controller: 'MainCtrl'
      });
  });