let SOCKET_IO = {};
SOCKET_IO.connect = function (io) {
    SOCKET_IO.io = io;
    io.on('connection', function (socket) {
        SOCKET_IO.socket = socket;
        socket.on('joinRoom', function (data) {
            socket.join(data);

        });
        socket.on('click', function (data) {
            console.log(data.room);
            
            io.in(data.room).emit('XO', data);
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

module.exports.socket_io = SOCKET_IO;
