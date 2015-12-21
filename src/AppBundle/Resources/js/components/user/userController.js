'use strict';
angular.module('app')
    .controller('UserController', UserController);

UserController.$inject = ['$scope','$location', 'UserService', 'FlashService'];
function UserController($scope, $location, UserService, FlashService) {
  (function initController() {
    // reset login status
    UserService.clearCredentials();
  })();

  $scope.login = function() {
    $scope.dataLoading = true;
    UserService.login($scope.username, $scope.password, function (response) {
      if (response.success) {
        UserService.setCredentials($scope.username, $scope.password);
        $location.path('/admin');
      } else {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
      }
    });
  };

  $scope.register = function() {
    $scope.dataLoading = true;
    UserService.register($scope.username, $scope.password, $scope.password_repeat, $scope.email, $scope.form_message, function (response) {
      if (response.success) {
        FlashService.Success("Du wurdest registriert und Sami benachrichtigt - sie wird sich bei dir melden wenn dein Account aktiviert wurde oder noch Fragen offen bleiben.");
        $scope.success = true;
        $scope.dataLoading = false;
      } else {
        FlashService.Error(response.message);
        $scope.success = false;
        $scope.dataLoading = false;
      }
    });
  }
}