'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the virtualQueueFrontendApp
 */
angular.module('virtualQueueFrontendApp')
  .controller('UserCtrl', ['$scope', 'roleFactory', 'userFactory', 'roleMappingFactory', function ($scope, roleFactory, userFactory, roleMappingFactory) {
    
    $scope.roles = [];
    $scope.message = '';
    
    $scope.form = {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      username: '',
      password: ''
    };

    $scope.rol = '';

    $scope.registerUser = function () {
      userFactory.getUsers().save(
        $scope.form,
        function (response) {
          roleMappingFactory.getRoleMappings().save({
            principalType: 'USER',
            principalId: response.id,
            roleId: $scope.rol
          },
          function () {
            $scope.rol = '';
            console.log('Rol attached');
          },
          function () {
            $scope.rol = '';
            console.log('Rol not attached');
          });
          $scope.form = {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            username: '',
            password: ''
          };
          $scope.registrationForm.$setPristine();
        },
        function (response) {
          $scope.message = {
            code: response.status,
            text: response.statusText
          };
        }
      );
    };

    roleFactory.getRoles().query(
      function (response) {
        $scope.roles = response;
      },
      function (response) {
        $scope.message = {
					code: response.status,
					text: response.statusText
				};
      }
    );

  }]);
