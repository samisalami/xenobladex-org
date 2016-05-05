'use strict';

angular.module('app')
    .directive('xcxSpoiler',['$rootScope', function($rootScope) {
        return {
            restrict: 'AEC',
            transclude: true,
            template: '<div ng-click="vm.spoiler()" class="spoiler-wrapper" ng-class="{\'active\':vm.showSpoiler}"><span class="spoiler-label"><i class="fa fa-arrow-down"></i> {{vm.spoilerLabel}}</span><div ng-if="vm.showSpoiler" ng-transclude=""></div></div>',
            scope: true,
            controller: function ()
            {
                var that = this;
                that.showSpoiler = false;
                that.spoilerLabel = 'Aufklappen';

                this.spoiler = function() {
                    that.showSpoiler = !that.showSpoiler;
                    that.setSpoilerLabel();
                };

                this.setSpoilerLabel = function() {
                    that.spoilerLabel = that.showSpoiler ? 'Zuklappen':'Aufklappen';
                };
            },
            controllerAs: 'vm'
        };
    }]);