'use strict';

angular
    .module('app', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap'
    ])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'templates/start.html'
      })
      .when('/login', {
        controller: 'UserController',
        templateUrl: 'templates/loginView.html'
      })
      .when('/register', {
        controller: 'UserController',
        templateUrl: 'templates/registrationView.html'
      })
      .when('/admin', {
        controller: 'AdminController',
        templateUrl: 'templates/adminView.html'
      })
      .otherwise({
          templateUrl: 'templates/404.html'
      });
  $locationProvider.html5Mode(true);
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
    var restrictedPage = $.inArray($location.path(), ['/admin', '/login']) !== -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/login');
    }
  });
}