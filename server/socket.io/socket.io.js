let SOCKET_IO = {};
let BOARD;
let START = false;
let WIN = '';
// let CURRENT_PLAYER = 1;
let PLAY;
let PLAYER1 = {
    username: '',
    isClicked: false
};
let PLAYER2 = {
    username: '',
    isClicked: false
};
SOCKET_IO.connect = function (io) {
    SOCKET_IO.io = io;
    io.on('connection', function (socket) {
        SOCKET_IO.socket = socket;

        socket.on('createRoom', function (data) {
            PLAYER1.username = data;
        })

        socket.on('joinRoom', function (data) {
            socket.join(data);
            if (BOARD == undefined) {
                BOARD = Array.matrix(15, 0);
            }
        });

        socket.on('getBoard', function () {
            socket.emit('board', { board: BOARD, start: START })
        })

        socket.on('click', function (data) {
            if (START == true) {
                BOARD[data.row][data.col] = data.curPlayer;
                if (checkOnHorizontal(BOARD, data.row, data.col, data.curPlayer) === 1
                    || checkOnVertically(BOARD, data.row, data.col, data.curPlayer) === 1
                    || checkOnDiagonal(BOARD, data.row, data.col, data.curPlayer) === 1
                    || checkOnDiagonalMain(BOARD, data.row, data.col, data.curPlayer) === 1) {
                    if (data.curPlayer == -1) {
                        io.in(data.room).emit('XO', { data: data, win: WIN, board: BOARD, start: START });
                        WIN = 'O';
                    } else {
                        io.in(data.room).emit('XO', { data: data, win: WIN, board: BOARD, start: START });
                        WIN = 'X';
                    }
                } else {
                    io.in(data.room).emit('XO', { data: data, win: WIN, board: BOARD, start: START });
                }
            }
        });

        socket.on('startPlay', function (data) {
            if ((PLAYER2.username == '') || (PLAYER2.username == data)) {
                PLAYER2.username = data;
                if (START == true) {
                    BOARD = Array.matrix(15, 0);
                }
                START = true;
                WIN = '';
                socket.emit('initBoard', BOARD);
            }

        })

        socket.on('quitRoom', function () {

        })
    })
};

Array.matrix = function (n, init) {
    let mat = [];
    for (let i = 0; i < n; i++) {
        let a = [];
        for (let j = 0; j < n; j++) {
            a[j] = init;
        }
        mat[i] = a;
    }
    return mat;
}

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

module.exports.socket_io = SOCKET_IO;
