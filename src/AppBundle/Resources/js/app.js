'use strict';

angular
    .module('app', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap',
        'xeditable'
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
        templateUrl: 'templates/admin.html'
      })
      .when('/admin/missionen', {
        templateUrl: 'templates/admin_missions.html'
      })
      .when('/admin/karten', {
        templateUrl: 'templates/admin_maps.html'
      })
      .when('/admin/dateien', {
        templateUrl: 'templates/admin_attachments.html'
      })
      .when('/admin/personen', {
        templateUrl: 'templates/admin_persons.html'
      })
      .otherwise({
          templateUrl: 'templates/404.html'
      });
  $locationProvider.html5Mode(true);
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'editableOptions'];
function run($rootScope, $location, $cookieStore, $http, editableOptions) {
    editableOptions.theme = 'bs3';

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $location.path().indexOf("/admin") !== -1;

        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
  });
}