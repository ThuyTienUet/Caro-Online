angular
    .module('caroOnline')
    .service('dialogLogin', dialogUtils);

function dialogUtils(ModalService, authentication, $window) {
    let dialogUtils = {};

    dialogUtils.login = function (callback) {
        function doLogin($scope, $http, close) {
            $scope.name = "";
            $scope.password = "";
            $scope.formError = "";
            this.onOkButtonClicked = function () {
                if ($scope.name == "" || $scope.password == "") {
                    $scope.formError = "All fields required, please try again";
                } else {
                    authentication.login({
                        username: $scope.name,
                        password: $scope.password
                    }, function (res) {
                        console.log('dialog: ', res)
                        // $http.post('/login', res)
                        //     .then(function successCallback(data) { 
                        //         if (data && (data.data.user.role == 0 || data.data.user.role == 1)) {
                        //             window.localStorage.setItem('user', JSON.stringify(data.data.user));
                        //             window.localStorage.setItem('token', data.data.token);
                        //             close($scope.data);
                        //             window.location.href;
                        //             callback(1);
                        //         } else {
                        //             toastr.error('Login fail')
                        //         }
                        //     },
                        //         function errorCallback(e) {
                        //             console.log(e);
                        //         });
                    })
                }
            };
            this.onCancelButtonClicked = function () {
                close(null);
            };

        }

        ModalService.showModal({
            templateUrl: '/service/modal/login.html',
            controller: doLogin,
            controllerAs: "wiModal"
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
            });
        });
    }
    return dialogUtils;
}
