angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);
function homeCtrl($scope) {
    let socket = io('http://localhost:3000');
    $scope.onClick = function () {
        socket.emit('joinRoom', {
            nameRoom: 'a'
        })
        socket.on('join', function(data) {
            console.log('join ');
        })
    }
    $scope.addRoom = () =>{
        
    }

}
