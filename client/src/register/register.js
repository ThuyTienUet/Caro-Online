angular
    .module('caroOnline')
    .controller('registerCtrl', registerCtrl);

function registerCtrl($location, auth, $http, $scope) {
    $scope.user = {
        username: "",
        password: "",
        cf_password: ""
    };

    $scope.onSubmit = function () {
        $scope.formError = "";
        if (!$scope.user.username || !$scope.user.password || !$scope.user.cf_password) {
            $scope.formError = "All fields required, please try again";
            return false;
        } else if ($scope.user.password != $scope.user.cf_password) {
            $scope.formError = "Confirm password is not match, please try again";
            return false;
        } else {
            doRegister();
        }
    };
  
    function doRegister() {
        $scope.formError = "";
        auth
            .register($scope.user, function (data) {
                if (data.code === 200) {
                    socket.emit('register', $scope.user);
                    $location.path('/login');
                } else {
                    $scope.formError = "Username exist already";
                }
            })
    };
}
