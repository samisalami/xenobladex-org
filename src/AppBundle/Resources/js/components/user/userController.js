'use strict';
angular.module('app')
    .controller('UserController', UserController);

UserController.$inject = ['$scope','$location', 'userService', 'flashService'];
function UserController($scope, $location, userService, flashService) {
  (function initController() {
    // reset login status
    userService.clearCredentials();
  })();

  $scope.login = function() {
    $scope.dataLoading = true;
    userService.login($scope.username, $scope.password, function (response) {
      if (response.success) {
        userService.setCredentials($scope.username, $scope.password);
        $location.path('/admin');
      } else {
        flashService.error(response.message);
        $scope.dataLoading = false;
      }
    });
  };

  $scope.register = function() {
    $scope.dataLoading = true;
    userService.register($scope.username, $scope.password, $scope.password_repeat, $scope.email, $scope.form_message, function (response) {
      if (response.success) {
        flashService.success("Du wurdest registriert und Sami benachrichtigt - sie wird sich bei dir melden wenn dein Account aktiviert wurde oder noch Fragen offen bleiben.");
        $scope.success = true;
        $scope.dataLoading = false;
      } else {
        flashService.error(response.message);
        $scope.success = false;
        $scope.dataLoading = false;
      }
    });
  }
}