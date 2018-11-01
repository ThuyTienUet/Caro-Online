angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);

function roomCtrl($scope, $window, $timeout, $http) {
    let roomName = $window.localStorage['room'];
    let username = $window.localStorage['user'];

    let curPlayer = 1; 

    socket.emit('getBoard', '');

    socket.on('board', function (data) {
        $timeout(function () {
            $scope.board = data.board
        })
    })

    socket.on('initBoard', function (data) {
        $timeout(function () {
            $scope.board = data
        })
    });

    socket.on('XO', function (data) {
        $timeout(function () {
            if (data.win == '') {
                $scope.board = data.board;
            }
        })
    });

    $scope.start = function () {
        socket.emit('startPlay', username);
    }

    $scope.quit = function () {
        socket.emit('quitRoom', 'quit');
        $http.post('/api/room/user/list', { roomName: roomName })
            .then(function successCallback(data) {
                // if (data.data.room.Users) 
                
            }, function errorCallback(err) {
                console.log(err);
            })
    }

    $scope.clickXO = function (row, col) {
        if ($scope.board[row][col] == 0) {
            if ($scope.board != undefined) {
                socket.emit('click', {
                    row: row,
                    col: col,
                    curPlayer: curPlayer,
                    room: roomName 
                });
                curPlayer *= -1;
            }
        }
    }

    var timeleft = 30;
    var downloadTimer = setInterval(function () {
        document.getElementById("time").innerHTML = timeleft--;
        if (timeleft < 0) {
            timeleft = 30;
        }
    }, 1000);
}
