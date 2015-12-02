'use strict';
angular.module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$scope','$location', 'AuthenticationService', 'FlashService'];
function LoginController($scope, $location, AuthenticationService, FlashService) {
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
  }
}