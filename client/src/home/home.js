angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $http, auth) {

    let socket = io('http://localhost:3000');

    $scope.onClick = function () {
        socket.emit('joinRoom', {
            nameRoom: 'a'
        })
        socket.on('join', function (data) {
            console.log('join ');
        })
    }
    $scope.addRoom = function() {
        console.log('add room');
        let user = auth.getUser();
        console.log(user);
        
        // $http.post('api/room/listUSer', tmp)
        //     .then(function successCallback(data) {
        //         console.log(data);
        //     }, function errorCallback(err) {
        //         console.log(err);
        //     })

        // $http.post('api/room/add', tmp)
        //     .then(function successCallback(data) {
        //         console.log(data);
        //     }, function errorCallback(err) {
        //         console.log(err);
        //     })
    }
}
