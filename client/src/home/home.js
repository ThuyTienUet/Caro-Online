angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $http, auth) {

    let socket = io('http://localhost:3000');
    let tmp = {};
    $http.post('api/room/listUSer', tmp)
        .then(function successCallback(data) {
            console.log(data);
        }, function errorCallback(err) {
            console.log(err);
        })


    $scope.onClick = function () {
        socket.emit('joinRoom', {
            nameRoom: 'a'
        })
        socket.on('join', function (data) {
            console.log('join ');
        })
    }

    $scope.addRoom = function() {
        let user = JSON.parse(auth.getUser());
        let room = {
            name: user.username
        }
        // $http.post('api/room/listUSer', tmp)
        //     .then(function successCallback(data) {
        //         console.log(data);
        //     }, function errorCallback(err) {
        //         console.log(err);
        //     })

        $http.post('api/room/new', room)
            .then(function successCallback(data) {
                console.log(data);

            }, function errorCallback(err) {
                console.log(err);
            })
    }

    socket.on('createRoom', function (data) {
        console.log(data);
    })
}
