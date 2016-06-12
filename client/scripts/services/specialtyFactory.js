'use strict';

angular
	.module('virtualQueueFrontendApp')
	.factory('specialtyFactory', ['$resource', 'baseURL', function($resource, baseURL) {
		var specialty = {};
		
		specialty.getSpecialties = function() {
			return $resource(baseURL + 'specialties/:id', null, {'update': {method:'PUT'}});
		};
		
        specialty.getSpecialtiesWithDoctors = function() {
			return $resource(baseURL + 'specialties/:id?filter[include]=doctors', null, {'update': {method:'PUT'}});
		};
        
		return specialty;
	}]);