angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $http, auth, $location, $window, $timeout) {


    let tmp = {};
    $scope.rooms = [];
    $scope.users = [];

    $http.post('api/room/user/list', tmp)
        .then(function successCallback(data) {
            $scope.users = data.data.listUser;
        }, function errorCallback(err) {
            console.log(err);
        })

    $http.post('api/room/list', tmp)
        .then(function successCallback(data) {
            $scope.rooms = data.data.listRoom;
        }, function errorCallback(err) {
            console.log(err);
        })

    $scope.addRoom = function () {
        let user = JSON.parse(auth.getUser());
        let room = {
            name: user.username
        }
        $http.post('api/room/new', room)
            .then(function successCallback(data) {
                $window.localStorage['room'] = user.username;
                $location.path('/room')

            }, function errorCallback(err) {
                console.log(err);
            })
    }
    socket.on('roomNew', function (data) {
        $timeout(function () {
            $scope.rooms.push(data)
        })
    })

    $scope.joinRoom = function (roomName) {
        socket.emit('joinRoom', roomName);
        $window.localStorage['room'] = roomName;
        $location.path('/room')
    }
}
