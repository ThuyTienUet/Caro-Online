angular
    .module('caroOnline')
    .controller('adminCtrl', adminCtrl);

function adminCtrl($scope, $http, $timeout) {

    $scope.users = [];
    $http.post('/api/user/list')
        .then(function successCallback(data) {
            $scope.users = data.data.listUser;
        }, function errorCallback(err) {
            console.log(err);
        })

    $scope.deleteUser = function (id) {

        $http.post('/api/user/delete', { id: id })
            .then(function successCallback(data) {
                if (data.data.code == 200) {
                    $scope.users.forEach(function (user, i) {
                        if (user.id == id) {
                            $scope.users.splice(i, 1);
                        }
                    })
                    socket.emit('deleteUser', id);
                }
            }, function errorCallback(err) {
                console.log(err);

            })
    }
    socket.on('userNew', function (data) {
        $timeout(function () {
            $scope.users.push(data)
        })
    })
}
