'use strict';

angular
    .module('app')
    .factory('flashService', flashService);

flashService.$inject = ['$rootScope'];
function flashService($rootScope) {
  var service = {};

  service.success = success;
  service.error = error;
  service.clear = clearFlashMessage;

  initService();

  return service;

  function initService() {
    $rootScope.$on('$locationChangeStart', function () {
      clearFlashMessage();
    });
  }

  function clearFlashMessage() {
    var flash = $rootScope.flash;
    if (flash) {
      if (!flash.keepAfterLocationChange) {
        delete $rootScope.flash;
      } else {
        // only keep for a single location change
        flash.keepAfterLocationChange = false;
      }
    }
  }

  function success(message, keepAfterLocationChange) {
    $rootScope.flash = {
      message: message,
      success: true,
      keepAfterLocationChange: keepAfterLocationChange
    };
  }

  function error(message, keepAfterLocationChange) {
    $rootScope.flash = {
      message: message,
      success: false,
      keepAfterLocationChange: keepAfterLocationChange
    };
  }
}