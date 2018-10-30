angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $http) {

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
    $scope.addRoom = () => {
        console.log('add room');
        let tmp = {
            name: 'thao'
        }
        $http.post('api/room/listUSer', tmp)
            .then(function successCallback(data) {
                console.log(data);
            }, function errorCallback(err) {
                console.log(err);
            })

        // $http.post('api/room/add', tmp)
        //     .then(function successCallback(data) {
        //         console.log(data);
        //     }, function errorCallback(err) {
        //         console.log(err);
        //     })
    }
}
