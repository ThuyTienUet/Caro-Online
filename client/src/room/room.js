angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);
function roomCtrl($scope) {
    $scope.size = [1, 2, 3, 4, 5];
    //$scope.size.length = 10;
    let socket = io('http://localhost:3000');
    $scope.onClick = function () {
        
        socket.emit('joinRoom', {
            nameRoom: 'a'
        })
        socket.on('join', function(data) {
            console.log('join ');
        })
    }

}
