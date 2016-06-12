'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:PatientCtrl
 * @description
 * # PatientCtrl
 * Controller the patients view.
 */
angular
	.module('virtualQueueFrontendApp')
	.controller('PatientCtrl', ['$scope', 'userFactory', 'numberFactory', '$stateParams', '$state', function($scope, userFactory, numberFactory, $stateParams, $state) {
		
		//$scope.token = $localStorage.getObject('Token', '{}');
		
		$scope.showPatients = false;
		$scope.existPatients = false;
        $scope.doctor = {};
		$scope.patients = [];
        $scope.current = null;
        $scope.line = [];
        $scope.attended = [];
		$scope.form = {arrived: 'yes'};
		$scope.today = new Date();
		$scope.today.setHours(0);
		$scope.today.setMinutes(0);
		$scope.today.setSeconds(0);
		$scope.today.setMilliseconds(0);
        
        var separateByType = function(patients){
            patients.forEach(function(item) {
                switch(item.status){
                    case 'currently attending':
                        $scope.current = item;
                        break;
                    case 'in line':
                        $scope.line.push(item);
                        break;
                    case 'attended':
                    case 'did not arrive':
                        $scope.attended.push(item);
                        break;
                }
            });
        };
        
		userFactory.getUsers().get({
			id: $stateParams.id
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
			id: $stateParams.id,
			'filter[where][createdAt][gt]': $scope.today.toISOString()
		},
		function(response){
			$scope.patients = response;
			separateByType($scope.patients);
			$scope.showPatients = true;
			if($scope.patients.length > 0) {
				$scope.existPatients = true;
			}
		},
		function(response){
			$scope.message = {
				code: response.status,
				text: response.statusText
			};
		});
        
        $scope.callNext = function(){
			if($scope.current) {
				if($scope.form.arrived === 'yes'){
					$scope.current.status = 'attended';
				}
				else {
					$scope.current.status = 'did not arrive';
				}
				numberFactory.getNumbers().update($scope.current,
				function () {
					$state.go($state.current, {}, {reload: true});
				});
			}
			if($scope.line.length > 0) {
				$scope.line[0].status = 'currently attending';
				numberFactory.getNumbers().update($scope.line[0],
				function () {
					$state.go($state.current, {}, {reload: true});
				});
			}
        };
        
	}]);