'use strict';

/**
 * @ngdoc function
 * @name virtualQueueFrontendApp.controller:DoctorCtrl
 * @description
 * # DoctorCtrl
 * Controller of doctors view.
 */
angular
	.module('virtualQueueFrontendApp')
	.controller('DoctorCtrl', ['$scope', 'specialtyFactory', 'numberFactory', 'userFactory', '$stateParams', 'ngDialog', '$localStorage', function($scope, specialtyFactory, numberFactory, userFactory, $stateParams, ngDialog, $localStorage) {
		$scope.specialty = {};
        $scope.doctors = [];
		$scope.showSpecialty = false;
		$scope.existDoctors = false;
        $scope.token = $localStorage.getObject('Token', '{}');
        
		specialtyFactory.getSpecialtiesWithDoctors().get(
			{id: $stateParams.id},
			function(response) {
				$scope.specialty = response;
				$scope.showSpecialty = true;
                $scope.doctors = $scope.specialty.doctors;
                if($scope.doctors.length > 0){
                    $scope.existDoctors = true;
                }
			},
			function(response) {
				$scope.message = {
					code: response.status,
					text: response.statusText
				};
			});
        
        $scope.openDialog = function(doctorId, patientId) {            
            ngDialog.openConfirm({
                template: 'views/number.html',
                controller: 'NumberCtrl',
                data: {doctorId: doctorId, patientId: patientId}
            }).then(
                function () {
                    numberFactory.getNumbers().save({
                        doctorId: doctorId,
                        patientId: patientId
                    });
                    console.log('Saved number!');
                }
            );
        };
        
        $scope.getNumber = function(doctorId, patientId) {
            numberFactory.getNumbers().save({
                doctorId: doctorId,
                patientId: patientId
            },
            function(response){
                console.log(response);
            },
            function(response){
                $scope.message = {
					code: response.status,
					text: response.statusText
				};
            });
        };
        
	}]);