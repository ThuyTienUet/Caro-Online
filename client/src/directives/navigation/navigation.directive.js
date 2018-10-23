angular
.module('caroOnline')
.directive('navigation', navigation);

function navigation() {
    return {
        restrict: 'EA',
        templateUrl: 'src/directives/navigation/navigation.html',
        controller: 'navigationCtrl'
    }
}