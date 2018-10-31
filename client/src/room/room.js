angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);

function roomCtrl($scope, $window, $timeout) {
    let roomName = $window.localStorage['room'];
    let curPlayer = -1; //-1: X, 1: O

    
    $scope.board = Array.matrix(15, 0);

    $scope.click = function (row, col) {
        
        $scope.board[row][col] = curPlayer;

        if (checkOnHorizontal($scope.board, row, col, curPlayer) === 1
            || checkOnVertically($scope.board, row, col, curPlayer) === 1
            || checkOnDiagonal($scope.board, row, col, curPlayer) === 1
            || checkOnDiagonalMain($scope.board, row, col, curPlayer) === 1) console.log("WIN");

        socket.emit('click', {
            row: row,
            col: col,
            curPlayer:curPlayer,
            room: roomName
        });
        curPlayer *= -1;
        console.log($scope.board[row][col]);
        
    }

    socket.on('XO', function (data) {
        $timeout(function () {
            $scope.board[data.row][data.col] = data.curPlayer;
        })
    })

    //kiem tra hang ngang
    function checkOnHorizontal(board, cur_row, cur_col, cur_val) {
        let count_left = 0;
        let count_right = 0;
        //di sang trai so voi cur_pos
        for (let i = cur_col; i >= 0; i--) {
            if (board[cur_row][i] === cur_val) {
                count_left++;
            } else {
                break;
            }
        }
        //di sang phai so voi cur_pos
        for (let i = cur_col + 1; i < 15; i++) {
            if (board[cur_row][i] === cur_val) {
                count_right++;
            } else {
                break;
            }
        }
        if (count_left + count_right >= 5) {
            return 1;
        }
    }

    //kiem tra theo hang doc
    function checkOnVertically(array_board, cur_row, cur_col, cur_val) {
        let count_up = 0;
        let count_down = 0;
        for (let i = cur_row; i < 15; i++) {
            if (array_board[i][cur_col] === cur_val) {
                count_down++;
            } else {
                break;
            }
        }
        for (let i = cur_row - 1; i >= 0; i--) {
            if (array_board[i][cur_col] === cur_val) {
                count_up++;
            } else {
                break;
            }
        }
        if (count_up + count_down >= 5) {
            return 1;
        }
    }

    //kiem tra duong cheo phu
    function checkOnDiagonal(array_board, cur_row, cur_col, cur_val) {
        let count_right_up = 0;
        let count_left_down = 0;
        let temp1 = 0;
        let temp2 = 1;
        //kiem tra theo duong cheo phia tren ben phai so voi cur_pos
        for (let i = cur_row; i >= 0; i--) {
            if (array_board[i][cur_col + temp1] === cur_val) {
                count_right_up++;
                temp1++;
            } else {
                break;
            }
        }
        //kiem tra theo duong cheo phia duoi ben trai so voi cur_pos
        for (let i = cur_row + 1; i < 15; i++) {
            if (array_board[i][cur_col - temp2] === cur_val) {
                count_left_down++;
                temp2++;
            } else {
                break;
            }
        }
        if (count_left_down + count_right_up >= 5) {
            return 1;
        }
    }

    //kiem tra duong cheo chinh
    function checkOnDiagonalMain(array_board, cur_row, cur_col, cur_val) {
        let count_right_down = 0;
        let count_left_up = 0;
        let temp1 = 0;
        let temp2 = 1;
        //kiem tra phia tren ben trai cua cur_pos
        for (let i = cur_row; i >= 0; i--) {
            if (array_board[i][cur_col - temp1] === cur_val) {
                count_left_up++;
                temp1++;
            } else {
                break;
            }
        }
        //kiem tra phia duoi ben trai so voi cur_pos
        for (let i = cur_row + 1; i < 15; i++) {
            if (array_board[i][cur_col + temp2] === cur_val) {
                count_right_down++;
                temp2++;
            } else {
                break;
            }
        }
        if (count_left_up + count_right_down >= 5) {
            return 1;
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
