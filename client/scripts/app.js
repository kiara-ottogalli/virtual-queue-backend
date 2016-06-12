'use strict';

/**
 * @ngdoc overview
 * @name virtualQueueFrontendApp
 * @description
 * # virtualQueueFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('virtualQueueFrontendApp', [
    'ngResource',
    'ngDialog',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
		  .state('login', {
			  url: '/',
			  views: {
				  'content': { templateUrl: 'views/login.html', controller: 'LoginCtrl' },
				}
			})
      .state('specialties', {
				url: '/specialties',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content': { templateUrl: 'views/main.html', controller: 'MainCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      })
			.state('specialties.doctors', {
				url: '/:id/doctors',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content@': { templateUrl: 'views/doctors.html', controller: 'DoctorCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      })
	  	.state('doctors', {
				url: '/doctors',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content': { templateUrl: 'views/patients.html', controller: 'PatientCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      })
	  	.state('doctors.patients', {
				url: '/:id',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content@': { templateUrl: 'views/patients.html', controller: 'PatientCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      })
	  	.state('about', {
				url: '/about',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content': { templateUrl: 'views/about.html', controller: 'AboutCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      })
			.state('users', {
				url: '/users',
				views: {
					'header': { templateUrl: 'views/header.html', controller: 'HeaderCtrl' },
					'content': { templateUrl: 'views/users.html', controller: 'UserCtrl' },
					'footer': { templateUrl: 'views/footer.html' }
				}
      });
	  $urlRouterProvider.otherwise('/');
  });
