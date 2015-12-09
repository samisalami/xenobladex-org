'use strict';
angular.module('app')
    .controller('UserController', UserController);

UserController.$inject = ['$scope','$location', 'AuthenticationService', 'FlashService'];
function UserController($scope, $location, AuthenticationService, FlashService) {
  (function initController() {
    // reset login status
    AuthenticationService.ClearCredentials();
  })();

  $scope.login = function() {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.username, $scope.password, function (response) {
      if (response.success) {
        AuthenticationService.SetCredentials($scope.username, $scope.password);
        $location.path('/admin');
      } else {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
      }
    });
  };

  $scope.register = function() {
    $scope.dataLoading = true;
    AuthenticationService.Register($scope.username, $scope.password, $scope.password_repeat, $scope.email, $scope.form_message, function (response) {
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