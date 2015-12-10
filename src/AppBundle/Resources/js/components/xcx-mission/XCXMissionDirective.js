'use strict';

angular.module('app')
    .directive('XCXMissionDirective', XCXMissionDirective);

XCXMissionDirective.$inject = ['XCXMissionService'];
function XCXMissionDirective(XCXMissionService) {
    return {
        templateUrl:'templates/XCXMissionView.html',
        link: [function($scope, $element,$attrs){
            
        }]
    }
}