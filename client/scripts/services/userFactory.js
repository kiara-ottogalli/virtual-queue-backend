'use strict';

angular
	.module('virtualQueueFrontendApp')
	.factory('userFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		var userFact = {};
		
		userFact.getUsers = function() {
			return $resource(baseURL + 'AppUsers/:id', null, {'update': {method:'PUT'}});
		};
        
        userFact.getPatientLine = function() {
			return $resource(baseURL + 'AppUsers/:id/patientNumbers?filter[include]=patient&filter[order]=createdAt%20ASC', null, {'update': {method:'PUT'}});
		};
        
		userFact.getDoctors = function() {
			return $resource(baseURL + 'AppUsers/:id/doctors?filter[include]=specialty&filter[include]=patientNumbers', null, {'update': {method:'PUT'}});
		};

		userFact.getRoles = function () {
			return $resource(baseURL + 'AppUsers/:id/roles', null, {'update': {method:'PUT'}});
		};

		return userFact;
	}]);