'use strict';

angular
    .module('app', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap',
        'xeditable',
        'naturalSort'
    ])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/start.html'
      })
      .when('/faq', {
        templateUrl: 'views/faq.html'
      })
      .when('/missionen', {
        templateUrl: 'views/missions.html'
      })
      .when('/material', {
        templateUrl: 'views/materials.html'
      })
      .when('/login', {
        controller: 'UserController',
        templateUrl: 'js/components/user/loginView.html'
      })
      .when('/register', {
        controller: 'UserController',
        templateUrl: 'js/components/user/registrationView.html'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html'
      })
      .when('/admin/missionen', {
        templateUrl: 'views/admin_missions.html'
      })
      .when('/admin/missionen/was-fehlt', {
        templateUrl: 'views/admin_missions_missing.html'
      })
      .when('/admin/karten', {
        templateUrl: 'views/admin_maps.html'
      })
      .when('/admin/dateien', {
        templateUrl: 'views/admin_attachments.html'
      })
      .when('/admin/personen', {
        templateUrl: 'views/admin_persons.html'
      })
      .when('/admin/personen/was-fehlt', {
        templateUrl: 'views/admin_persons_missing.html'
      })
      .when('/admin/test', {
        templateUrl: 'views/admin_test.html'
      })
      .when('/admin/faq', {
        templateUrl: 'views/admin_faqs.html'
      })
      .when('/admin/kartenpunkte', {
        templateUrl: 'views/admin_mapmarkers.html'
      })
      .when('/admin/monster', {
        templateUrl: 'views/admin_monsters.html'
      })
      .when('/admin/monster/was-fehlt', {
          templateUrl: 'views/admin_monsters_missing.html'
      })
      .when('/admin/monster_gattungen', {
        templateUrl: 'views/admin_monsterTypes.html'
      })
      .when('/admin/material', {
        templateUrl: 'views/admin_material.html'
      })
      .when('/admin/material/was-fehlt', {
          templateUrl: 'views/admin_materials_missing.html'
      })
      .otherwise({
          templateUrl: 'views/404.html'
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

        if(!restrictedPage) {
            $rootScope.frontend = true;
        }
  });
}