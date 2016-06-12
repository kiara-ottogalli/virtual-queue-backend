'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:NumberCtrl
 * @description
 * # NumberCtrl
 * Controller of the virtualQueueFrontendApp
 */
angular.module('virtualQueueFrontendApp')
  .controller('NumberCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
      
    $scope.doctor = {};
    $scope.line = [];
    $scope.lastNumber = 0;
    $scope.currentNumber = 0;
    $scope.alreadyInLine = false;
    $scope.lineNumber = 0;
    $scope.today = new Date();
    $scope.today.setHours(0);
    $scope.today.setMinutes(0);
    $scope.today.setSeconds(0);
    $scope.today.setMilliseconds(0);
    
    userFactory.getUsers().get({
        id: $scope.ngDialogData.doctorId
    },
    function(response){
        $scope.doctor = response;
    },
    function(response){
        $scope.message = {
            code: response.status,
			text: response.statusText
        };
    });
      
    userFactory.getPatientLine().query({
        id: $scope.ngDialogData.doctorId,
		'filter[where][createdAt][gt]': $scope.today.toISOString()
    },
    function(response){
        $scope.line = response;
        var i;
        for(i = 0; i < $scope.line.length; i++) {
            if($scope.line[i].status === 'in line' || $scope.line[i].status === 'currently attending') {
                if($scope.line[i].patient.id === $scope.ngDialogData.patientId) {
                    $scope.alreadyInLine = true;
                    $scope.lineNumber = i+1;
                }
            }
            if($scope.line[i].status === 'currently attending') {
                $scope.currentNumber = i+1;
            }
        }
        $scope.lastNumber = $scope.line.length + 1;
    },
    function(response){
        $scope.message2 = {
            code: response.status,
			text: response.statusText
        };
    });
    
  }]);
