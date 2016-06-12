'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the virtualQueueFrontendApp
 */
angular.module('virtualQueueFrontendApp')
  .controller('HeaderCtrl', ['$scope', '$rootScope', '$window', '$localStorage', 'authFactory', 'userFactory', function ($scope, $rootScope, $window, $localStorage, authFactory, userFactory) {
    
    $scope.token = $localStorage.getObject('Token', '{}');

    userFactory.getRoles().query({
      id: $scope.token.userid
    },
    function(response){
      if(response.length > 0) {
        var role = response[0].name;
        $scope.isAdmin = (role === 'admin');
        $scope.isDoctor = (role === 'doctor');
      }
    });

    $scope.logout = function() {
      authFactory.logout();
      $rootScope.loggedIn = false;
      $rootScope.username = '';
      $window.location.href = '#';
    };

    if(!authFactory.isAuthenticated()){
      $window.location.href = '#';
    }

  }]);
