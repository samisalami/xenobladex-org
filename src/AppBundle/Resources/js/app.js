'use strict';

angular
    .module('app', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap'
    ])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'templates/homeView.html',
        controller: 'HomeController'
      })
      .when('/login-form', {
        controller: 'LoginController',
        templateUrl: 'templates/loginView.html'
      })
      .when('/anmelden', {
        controller: 'RegistrationController',
        templateUrl: 'templates/registrationView.html'
      })
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(), ['/login-form', '/admin', '/login']) !== -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/login-form');
    }
  });
}