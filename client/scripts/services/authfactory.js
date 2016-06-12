'use strict';

/**
 * @ngdoc service
 * @name virtualQueueFrontendApp.authFactory
 * @description
 * # authFactory
 * Factory in the virtualQueueFrontendApp.
 */
angular.module('virtualQueueFrontendApp')
  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      remove: function (key) {
        $window.localStorage.removeItem(key);
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    };
  }])
  .factory('authFactory', ['$http', '$localStorage', '$resource', 'baseURL', '$rootScope', function ($http, $localStorage, $resource, baseURL, $rootScope) {
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var userid;
    var authToken;
    
    function useCredentials(credentials) {
      isAuthenticated = true;
      username = credentials.username;
      userid = credentials.userid;
      authToken = credentials.token;
      // Set the token as header for your requests!
      $http.defaults.headers.common['x-access-token'] = authToken;
    }
    
    function loadUserCredentials() {
      var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
      if (credentials.username !== undefined) {
        useCredentials(credentials);
      }
    }
    
    function storeUserCredentials(credentials) {
      $localStorage.storeObject(TOKEN_KEY, credentials);
      useCredentials(credentials);
    }
    
    function destroyUserCredentials() {
      authToken = undefined;
      userid = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['x-access-token'] = authToken;
      $localStorage.remove(TOKEN_KEY);
    }
     
    authFac.login = function(loginData) {
      $resource(baseURL + 'AppUsers/login').save(
        loginData,
        function(response) {
          var credentials = {
            userid: response.userId,
            username:loginData.username,
            token: response.id
          };
          storeUserCredentials(credentials);
          $rootScope.$broadcast('login:Successful');
        },
        function(){
          isAuthenticated = false;
          $rootScope.$broadcast('login:Unsuccessful');
        }
      );
    };
    
    authFac.logout = function() {
      $resource(baseURL + 'AppUsers/logout').save(function(){});
      destroyUserCredentials();
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };
    
    authFac.getUserId = function() {
        return userid;  
    };
    
    authFac.loadCredentials = function() {
        loadUserCredentials();
    };

    loadUserCredentials();
    
    return authFac;
  }]);
