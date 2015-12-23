'use strict';

angular.module('app')
    .directive('loadingDirective',['$http', function($http) {
        return {
            restrict: 'E',
            templateUrl: 'templates/loadingView.html',
            link: function ($scope, elm, attrs)
            {
                $scope.isLoading = function () {
                    return $http.pendingRequests.length != 0;
                };

                var $modalElm = elm.find('#loading-modal');
                $modalElm.modal({backdrop:false, show:false});

                $scope.$watch($scope.isLoading, function (v)
                {
                    if(v){
                        $modalElm.modal('show');
                    } else {
                        $modalElm.modal('hide');
                    }
                });
            }
        };
    }]);