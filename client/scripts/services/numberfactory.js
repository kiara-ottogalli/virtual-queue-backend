'use strict';

/**
 * @ngdoc service
 * @name virtualQueueFrontendApp.numberFactory
 * @description
 * # numberFactory
 * Factory in the virtualQueueFrontendApp.
 */
angular.module('virtualQueueFrontendApp')
  .factory('numberFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    var attNumber = {};
		
    attNumber.getNumbers = function() {
        return $resource(baseURL + 'AttentionNumbers/:id', null, {'update': {method:'PUT'}});
    };

    return attNumber;
  }]);
