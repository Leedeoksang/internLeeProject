'use strict';

angular.module('homeDashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('introMain', {
        url: '/introMain',
        templateUrl: 'app/views/introMain/introMain.html',
        controller: 'IntroMainCtrl'
      });
  });