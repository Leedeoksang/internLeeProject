'use strict';

angular.module('homeDashboardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/introMain');

    $locationProvider.html5Mode(true);
  });
