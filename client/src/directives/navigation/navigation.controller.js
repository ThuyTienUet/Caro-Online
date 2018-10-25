
angular
    .module('caroOnline')
    .controller('navigationCtrl', navigationCtrl);

function navigationCtrl($scope, $window, authentication) {

    $scope.isLoggedIn = false;
    $scope.name = "";

    $scope.logout = function () {
        $window.localStorage.removeItem('user-token');
        authentication.logout();
        $scope.isLoggedIn = false;
        window.location.href;
    };

    $scope.isLoggedIn = authentication.isLoggedIn();

    if ($scope.isLoggedIn == true) {
        let user = JSON.parse($window.localStorage['user']);
        $scope.name = user.username;
    }

    $scope.doLogin = function () {
        
    }

    $scope.home = function () {
        window.location.href;
    }
}
