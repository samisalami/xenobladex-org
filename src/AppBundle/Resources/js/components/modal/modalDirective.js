'use strict';

angular.module('app')
    .directive('modal', function() {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'js/components/modal/modalView.html',
            link: function($scope, element, attrs) {
                $scope.icon = attrs.icon;
                $scope.title = attrs.title;
                $scope.fullsize = attrs.fullsize;
                var modalDomIndex = angular.element('.modal').length;
                $scope.modalId = 'modal-' + modalDomIndex;
            }
        }
    });