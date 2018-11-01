angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);

function roomCtrl($scope, $window, $timeout) {
    let roomName = $window.localStorage['room'];
    let curPlayer = -1; //-1: O, 1: X

    // Array.matrix = function (n, init) {
    //     let mat = [];
    //     for (let i = 0; i < n; i++) {
    //         let a = [];
    //         for (let j = 0; j < n; j++) {
    //             a[j] = init;
    //         }
    //         mat[i] = a;
    //     }
    //     return mat;
    // }
    // $scope.boardTmp = Array.matrix(15, 0);

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
        socket.emit('startPlay', 'start');
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
