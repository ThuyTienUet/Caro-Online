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

    // let xoTable = document.getElementById("xoTable");
    // for (let i = 0; i < 10; i++) {
    //     let row = xoTable.appendChild("DIV");
    //     xoTable.write(`<div class="boardRow"></div>`);
    //     let row = document.getElementsByClassName("boardRow");
    //     for (let j = 0; j < 10; j++) {
    //         row.innerHTML = '<div class="boardCol"> <div class="boardCell" id="' + i + '-' + j + '"></div> </div>';
    //     }
    // }
}
