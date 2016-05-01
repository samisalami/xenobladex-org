'use strict';

angular
    .module('app', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap',
        'xeditable',
        'naturalSort',
        'textAngular',
        'colorpicker.module'
    ])
    .config(config)
    .run(run);

config.$inject = ['$routeProvider', '$locationProvider', '$provide'];
function config($routeProvider, $locationProvider, $provide) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/start.html'
      })
      .when('/faq', {
        templateUrl: 'js/data/faq/view/faq.html'
      })
      .when('/missionen/:missionTypeName?', {
        templateUrl: 'js/data/mission/view/missions.html'
      })
      .when('/material', {
        templateUrl: 'js/data/material/view/materials.html'
      })
      .when('/sammelitems', {
        templateUrl: 'js/data/collection/view/collectibles.html'
      })
      .when('/kollektikon', {
        templateUrl: 'js/data/collection/view/collections.html'
      })
      .when('/kreaturen/:region?', {
        templateUrl: 'js/data/monster/view/monsters.html'
      })
      .when('/impressum', {
        templateUrl: 'views/imprint.html'
      })
      .when('/login', {
        controller: 'UserController',
        templateUrl: 'js/data/user/loginView.html'
      })
      .when('/register', {
        controller: 'UserController',
        templateUrl: 'js/data/user/registrationView.html'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html'
      })
      .when('/admin/missionen', {
        templateUrl: 'js/data/mission/view/admin_missions.html'
      })
      .when('/admin/missionen/was-fehlt', {
        templateUrl: 'js/data/mission/view/admin_missions_missing.html'
      })
      .when('/admin/karten', {
        templateUrl: 'js/data/map/view/admin_maps.html'
      })
      .when('/admin/dateien', {
        templateUrl: 'js/data/attachment/view/admin_attachments.html'
      })
      .when('/admin/personen', {
        templateUrl: 'js/data/person/view/admin_persons.html'
      })
      .when('/admin/personen/was-fehlt', {
        templateUrl: 'js/data/person/view/admin_persons_missing.html'
      })
      .when('/admin/test', {
        templateUrl: 'views/admin_test.html'
      })
      .when('/admin/faq', {
        templateUrl: 'js/data/faq/view/admin_faqs.html'
      })
      //.when('/admin/kartenpunkte', {
      //  templateUrl: 'views/admin_mapmarkers.html'
      //})
      .when('/admin/kollektikon', {
        templateUrl: 'js/data/collection/view/admin_collections.html'
      })
      .when('/admin/kreaturen', {
        templateUrl: 'js/data/monster/view/admin_monsters.html'
      })
      .when('/admin/kreaturen/was-fehlt', {
        templateUrl: 'js/data/monster/view/admin_monsters_missing.html'
      })
      .when('/admin/monster_gattungen', {
        templateUrl: 'js/data/monster/view/admin_monsterTypes.html'
      })
      .when('/admin/material', {
        templateUrl: 'js/data/material/view/admin_material.html'
      })
      .when('/admin/material/was-fehlt', {
        templateUrl: 'js/data/material/view/admin_materials_missing.html'
      })
      .when('/admin/segmente', {
          templateUrl: 'js/data/map/view/admin_mapTiles.html'
      })
      .when('/admin/sammelitems', {
          templateUrl: 'js/data/collection/view/admin_collectibles.html'
      })
      .when('/admin/sammelitems/was-fehlt', {
          templateUrl: 'js/data/collection/view/admin_collectibles_missing.html'
      })
      .when('/admin/erweiterungen', {
          templateUrl: 'js/data/equip/view/admin_equipupgrades.html'
      })
      .when('/admin/erweiterungen/was-fehlt', {
          templateUrl: 'js/data/equip/view/admin_equipupgrades_missing.html'
      })
      .when('/admin/erweiterungen/:equipUpgradeId/stufen', {
          templateUrl: 'js/data/equip/view/admin_equipUpgradeTiers.html'
      })
      .when('/admin/erweiterungs-kategorien', {
          templateUrl: 'js/data/equip/view/admin_equipupgradecategories.html'
      })
      .when('/admin/ressourcen', {
          templateUrl: 'js/data/resource/view/admin_resources.html'
      })
      .when('/admin/guides', {
          templateUrl: 'js/data/guide/view/admin_guides.html'
      })
      .when('/admin/guide/:guideId?', {
          templateUrl: 'js/data/guide/view/admin_guide.html'
      })
      .when('/admin/links', {
          templateUrl: 'js/components/linkGenerator/admin_links.html'
      })
      .otherwise({
          templateUrl: 'views/404.html'
      });
  $locationProvider.html5Mode(true);

    //ta tools
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
        taRegisterTool('fontcolor', taFontColor());
        taRegisterTool('fontsize', taFontSize());
        taRegisterTool('spoiler', taSpoiler());
        taRegisterTool('twocolumn', taTwoColumn());
        taOptions.toolbar[0].push('fontcolor');
        taOptions.toolbar[0].push('fontsize');
        taOptions.toolbar[3].push('spoiler');
        taOptions.toolbar[2].push('twocolumn');
        return taOptions;
    }]);
}

run.$inject = ['$rootScope', '$location', '$anchorScroll', '$cookieStore', '$http', 'editableOptions'];
function run($rootScope, $location, $anchorScroll, $cookieStore, $http, editableOptions) {
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