'use strict';

/**
 * @ngdoc service
 * @name virtualQueueFrontendApp.roleMappingFactory
 * @description
 * # roleMappingFactory
 * Factory in the virtualQueueFrontendApp.
 */
angular.module('virtualQueueFrontendApp')
  .factory('roleMappingFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var roleMappings = {};
		
    roleMappings.getRoleMappings = function() {
        return $resource(baseURL + 'AppRoleMappings/:id', null, {'update': {method:'PUT'}});
    };

    return roleMappings;
  }]);
