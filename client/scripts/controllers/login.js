'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the virtualQueueFrontendApp
 */
angular.module('virtualQueueFrontendApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$localStorage', 'authFactory', function ($scope, $rootScope, $window, $localStorage, authFactory) {
    $scope.loginData = $localStorage.getObject('userinfo', '{}');
    
    $scope.login = function() {
      if($scope.rememberMe){
        $localStorage.storeObject('userinfo', $scope.loginData);
      }
      authFactory.login($scope.loginData);
    };
    
    $rootScope.$on('login:Successful', function () {
      $rootScope.loggedIn = authFactory.isAuthenticated();
      $rootScope.username = authFactory.getUsername();
      $window.location.href = '#/specialties';
    });
    
    $rootScope.$on('login:Unsuccessful', function () {
      $scope.message = 'Wrong username or password.';
    });

  }]);
