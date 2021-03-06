angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);

function roomCtrl($scope, $window, $timeout, $http, $rootScope, $route, $location, auth) {

    if (auth.isLoggedIn() == false) {
        $location.path('/')
    }
    let room = JSON.parse($window.sessionStorage['room']);
    let user = JSON.parse(auth.getUser());
    let tmp = user;
    $scope.mine = user;
    $scope.listUser = [];
    $scope.content = "";
    $scope.listMess = [];
    $scope.isBossRoom = false;
    $scope.win = false;
    $scope.lose = false;
    $scope.other = false;

    socket.emit('joined', { room: room, user: user });
    socket.on('joinedRoom', function (data) {
        $timeout(function () {
            $scope.listUser = data.listUser;
            $scope.listMess = data.listMess;
            $scope.board = data.board;
            $scope.player1 = data.player1;
            if (data.player2) {
                $scope.player2 = data.player2;
            } else {
                $scope.player2 = {}
            }
            if ($scope.player1.username == user.username) {
                $scope.isBossRoom = true;
            }
            if (data.win == 'X') {
                if (tmp.username == $scope.player1.username) {
                    $scope.win = true;
                } else if (tmp.username == $scope.player2.username) {
                    $scope.lose = true;
                } else {
                    $scope.other = true;
                    $scope.player_win = data.player1.username;
                }
            } else if (data.win == 'O') {
                if (tmp.username == $scope.player2.username) {
                    $scope.win = true;
                } else if (tmp.username == $scope.player1.username) {
                    $scope.lose = true;
                } else {
                    $scope.other = true;
                    $scope.player_win = data.player2.username;
                }
            }

        })
    })

    socket.on('initBoard', function (data) {
        $timeout(function () {
            $scope.win = false;
            $scope.board = data.board;
            $scope.player2 = data.player2;
            $scope.win = false;
            $scope.lose = false;
            $scope.other = false;
            // io.emit('tien', '');
            // var downloadTimer = setInterval(function () {
            //     document.getElementById("time").innerHTML = timeleft--;
            //     if (timeleft < 0) {
            //         timeleft = 30;
            //     }
            // }, 1000);
        })
    });

    // document.getElementById("time").innerHTML = timeleft--;

    $scope.start = function () {
        if (user.username == $scope.player1.username || user.username == $scope.player2.username || $scope.player2.username == "") {
            socket.emit('startPlay', { user: user, room: room });

        }
    }

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () { return $location.path() }, function (newLocation, oldLocation) {
        if ($rootScope.actualLocation === newLocation) {
            if (newLocation == '/home' && oldLocation == '/room') {
                socket.emit('quitRoom', { room: room, user: user, event: 'quit' });
                console.log(newLocation, oldLocation);
            }
        }
    });

    $scope.cancelMember = function (member) {
        socket.emit('quitRoom', { room: room, user: { username: member }, event: 'cancel' });
    }

    $scope.quit = function () {
        socket.emit('quitRoom', { room: room, user: user, event: 'quit' });
        $location.path('/home')
    }

    socket.on('quitedRoom', function (data) {
        $timeout(function () {
            if (user.username == data.member && data.event == 'cancel') {
                $location.path('/home')
            }
            $scope.listUser = data.listUser;
            $scope.player1 = data.player1;
            $scope.player2 = data.player2;
            $scope.board = data.board;
            $scope.win = false;
            $scope.lose = false;
            $scope.other = false;
        })
    })

    socket.on('deleteRoom', function (data) {
        if (room.name == data.name) {
            $location.path('/home')
        }
    })

    socket.on('cancelledRoom', function (data) {
        $location.path('/home')
    })

    $scope.clickXO = function (row, col) {
        if ($scope.win == false) {
            if ($scope.board[row][col] == 0) {
                if ($scope.board != undefined) {
                    socket.emit('click', {
                        row: row,
                        col: col,
                        room: room,
                        user: user
                    });
                }
            }
        }
    }

    socket.on('XO', function (data) {
        $timeout(function () {

            if (data.win == '') {
                $scope.board = data.board;
            }
            else {
                $scope.board = data.board;

                // console.log(data);

                if (data.win == 'X') {
                    if (tmp.username == $scope.player1.username) {
                        $scope.win = true;
                    } else if (tmp.username == $scope.player2.username) {
                        $scope.lose = true;
                    } else {
                        $scope.other = true;
                    }
                } else {
                    if (tmp.username == $scope.player2.username) {
                        $scope.win = true;
                    } else if (tmp.username == $scope.player1.username) {
                        $scope.lose = true;
                    } else {
                        $scope.other = true;
                    }
                }
                let user = {
                    username: data.user.username
                }
                $http.post('/api/user/point/update', user)
                    .then(function successCallback(data) {
                        $scope.playerWin = user.username;
                    }, function errorCallback(err) {
                        console.log(err);
                    })
            }
        })
    });

    $scope.sendMess = function () {
        socket.emit('sendMess', { user: user, room: room, content: $scope.content });
        // $("#conservation").animate({ scrollTop: $('#conservation').prop("scrollHeight")}, 10);
    }

    $scope.enterSendMess = function (e) {
        if (e.keyCode == 13) {
            let tmp = $scope.content.split(' ');
            socket.emit('sendMess', { user: user, room: room, content: $scope.content });
            // $("#conservation").animate({ scrollTop: $('#conservation').prop("scrollHeight")}, 10);
        }
    }

    socket.on('sended', function (data) {
        $("#conservation").animate({ scrollTop: $('#conservation').prop("scrollHeight") }, 10);
        $timeout(function () {
            $scope.listMess = data;
            $scope.content = "";
        })
    })

    socket.on('cancelUser', function (data) {
        if (user.id == data) {
            socket.emit('quitRoom', { room: room, user: user, event: 'quit' });
            $location.path('/');
        }
    })
}
