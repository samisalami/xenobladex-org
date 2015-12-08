'use strict';
angular.module('app')
    .controller('RegistrationController', ['$scope', 'AuthenticationService', 'FlashService', function($scope, AuthenticationService, FlashService){
      (function initController() {

      })();

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
    }]);
