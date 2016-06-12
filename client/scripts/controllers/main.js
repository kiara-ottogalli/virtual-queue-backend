'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the virtualQueueFrontendApp
 */
angular
	.module('virtualQueueFrontendApp')
	.controller('MainCtrl', ['$scope', '$localStorage', 'specialtyFactory', 'userFactory', 'numberFactory', function($scope, $localStorage, specialtyFactory, userFactory, numberFactory) {
		$scope.specialties = [];
		$scope.showSpecialties = false;
		$scope.existSpecialties = false;
		
		$scope.doctors = [];

		$scope.numbers = [];
		$scope.showNumbers = false;

		$scope.showCancelButton = false;

		$scope.token = $localStorage.getObject('Token', '{}');

		$scope.today = new Date();
		$scope.today.setHours(0);
		$scope.today.setMinutes(0);
		$scope.today.setSeconds(0);
		$scope.today.setMilliseconds(0);

		specialtyFactory.getSpecialties().query(
			function(response) {
				$scope.specialties = response;
				$scope.showSpecialties = true;
				if($scope.specialties.length > 0) {
					$scope.existSpecialties = true;
				}
			},
			function(response) {
				$scope.message = {
					code: response.status,
					text: response.statusText
				};
			});
		
		var searchPosition = function (patientId, line) {
			var found = false;
			var i = 0;
			var info = {numberId: 0, position: -1, status: '', attending: 0};
			var notToday = 0;
			while(i < line.length) {
				var numDate = new Date(line[i].createdAt);
				if(numDate < $scope.today) {
					notToday++;
				}
				i++;
			}
			i = 0;
			while(!found && i < line.length) {
				if(line[i].patientId === patientId && (line[i].status === 'in line' || line[i].status === 'currently attending')) {
					found = true;
					info.position = i+1-notToday;
					info.status = line[i].status;
					info.numberId = line[i].id;
				}
				if(line[i].status === 'currently attending') {
					info.attending = i+1-notToday;
				}
				i++;
			}
			return info;
		};

		userFactory.getDoctors().query({
			id: $scope.token.userid
		},
		function (response) {
			$scope.doctors = response;
			$scope.numbers = [];
			var i;
			var info;
			for(i = 0; i < $scope.doctors.length; i++) {
				info = searchPosition($scope.token.userid, $scope.doctors[i].patientNumbers);
				console.log(info);
				if(info.position !== -1) {
					var doctor = {};
					doctor.id = $scope.doctors[i].id;
					doctor.name = $scope.doctors[i].name;
					doctor.lastname = $scope.doctors[i].lastname;
					doctor.specialty = $scope.doctors[i].specialty.name;
					$scope.numbers.push({doctor: doctor, position: info.position, status: info.status, attending: info.attending, numberId: info.numberId});
				}
			}
			if($scope.numbers.length > 0) {
				$scope.showNumbers = true;
			}
		});
		
		$scope.cancelNumber = function (attNumber) {
			numberFactory.getNumbers().delete({
				id: attNumber.numberId
			},
			function () {
				var pos = $scope.numbers.indexOf(attNumber);
				if(pos !== -1){
					$scope.numbers.splice(pos, 1);
				}
				if(!$scope.numbers.length) {
					$scope.showNumbers = false;
				}
			},
			function (response) {
				$scope.message = {
					code: response.status,
					text: response.statusText
				};
				console.log($scope.message);
			});
		};

	}]);
