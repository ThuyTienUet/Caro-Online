angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);
function roomCtrl($scope) {
    $scope.size = [1, 2, 3, 4, 5];
    //$scope.size.length = 10;
}
