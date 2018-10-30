let SOCKET_IO = {};
SOCKET_IO.connect = function (io) {
    SOCKET_IO.io = io;
    io.on('connection', function (socket) {
        SOCKET_IO.socket = socket;
        socket.on('join room', function(data) {
            console.log(data);
          });
        // socket.on('event-click', function (data) {
        //     let viTri = 
        // })
    })
};
module.exports.socket_io = SOCKET_IO;
