angular
    .module('caroOnline')
    .controller('roomCtrl', roomCtrl);

function roomCtrl($scope, $window, $timeout, $http, $rootScope, $route, $location) {

    let room = JSON.parse($window.localStorage['room']);
    let user = JSON.parse($window.localStorage['user']);
    $scope.listUser = [];
    let win = false;
    socket.emit('joined', room);

    socket.on('joinedRoom', function (data) {
        $timeout(function () {
            $scope.listUser = data.listUser;
            $scope.board = data.board;
        })
    })

    socket.on('initBoard', function (data) {
        $timeout(function () {
            $scope.board = data
        })
    });

    $scope.start = function () {
        socket.emit('startPlay', { user: user, room: room });
        var timeleft = 30;
        var downloadTimer = setInterval(function () {
            document.getElementById("time").innerHTML = timeleft--;
            if (timeleft < 0) {
                timeleft = 30;
            }
        }, 1000);
    }

    //     $rootScope.$on('$locationChangeSuccess', function() {
    //         $rootScope.actualLocation = $location.path();
    //     });        

    //    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
    //         if($rootScope.actualLocation === newLocation) {
    //             socket.emit('quitRoom', { room: room, user: user});
    //         }
    // });

    $scope.quit = function () {
        socket.emit('quitRoom', { room: room, user: user });
    }

    socket.on('quitedRoom', function (data) {
        $timeout(function () {
            $scope.listUser = data;
        })
        $location.path('/home')
    })

    socket.on('deleteRoom', function () {
        $location.path('/home')
    })

    socket.on('bossRoom', function (data) {
        $http.post('/api/room/update', data)
            .then(function successCallback(data) {
                $location.path('/home')
                
            }, function errorCallback(err) {
                console.log(err);
            })
    })

    $scope.clickXO = function (row, col) {
        if (win == false) {
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
                win = true;
                $http.post('/api/user/point/update', { username: data.user.username })
                    .then(function successCallback(data) {
                        console.log(data);
                    }, function errorCallback(err) {
                        console.log(err);
                    })
            }
        })
    });
}
