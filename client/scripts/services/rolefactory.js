'use strict';

/**
 * @ngdoc service
 * @name virtualQueueFrontendApp.roleFactory
 * @description
 * # roleFactory
 * Factory in the virtualQueueFrontendApp.
 */
angular.module('virtualQueueFrontendApp')
  .factory('roleFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var roles = {};
		
    roles.getRoles = function() {
        return $resource(baseURL + 'AppRoles/:id', null, {'update': {method:'PUT'}});
    };

    roles.getRoleMappings = function () {
        return $resource(baseURL + 'AppRoles/:id/roleMappings', {id:'@id'}, {'update': {method:'PUT'}});
    };

    return roles;
  }]);
