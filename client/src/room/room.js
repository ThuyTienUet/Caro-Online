angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);
function roomCtrl($scope) {
    let socket = io('http://localhost:3000');

    $scope.onClick = function () {
        socket.emit('joinRoom', {
            nameRoom: 'a'
        })
        socket.on('join', function(data) {
            console.log('join ');
        })
    }
    
    Array.matrix = function (n, init) {
        let mat = [];
        for (let i = 0 ; i < n; i++) {
            let a = [];
            for (let j = 0; j < n; j++) {
                a[j] = init;
            }
            mat[i] = a;
        }
        return mat;
    }
    $scope.board = Array.matrix(15, 0);
    
    $scope.click = function (row, col) {
        console.log(row, col);
        
    }
}
