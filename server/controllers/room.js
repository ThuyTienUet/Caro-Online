var models = require('../database/db-connect');
var Room = models.Room;
var User = models.User;
var socket_io = require('../socket.io/socket.io').socket_io

module.exports.getListRoom = (req, res) => {
    Room.findAll({
        include: {
            model: User
        }
    }).then(list => {
        if (list) {
            res.send({ code: 200, content: "SUCCESSFULLY", listRoom: list })
        } else {
            res.send({ code: 404, content: "NOT FOUND" });
        }
    }).catch(err => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}

module.exports.createRoom = (req, res) => {
    Room.findOne({
        where: {
            name: req.body.name
        }
    }).then((room) => {
        if (room == null) {
            User.findOne({
                where: {
                    username: req.body.name
                }
            }).then(user => {
                Room.create({
                    name: req.body.name
                }).then((room) => {
                    room.addUsers([user.dataValues.id])
                        .then((result) => {
                           // console.log('add user', result);
                        }).catch((err) => {
                            console.log(err);
                        })
                        console.log(socket_io.io);
                        
                    socket_io.io.emit('createRoom', room);

                    res.send({ code: 200, content: "SUCCESSFULLY", room: { id: room.id, name: room.name, numUser: 1 } })
                })
            })

        } else {
            res.send({ code: 401, content: "CREATE ROOM FAIL" })
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}
module.exports.addUser = (req, res) => {
    Room.findOne({
        where: {
            name: req.body.nameRoom
        }
    }).then((room) => {
        if (room) {
            User.findOne({
                where: {
                    username: req.body.username
                }
            }).then(user => {
                if (user) {
                    room.addUsers([user.dataValues.id])
                        .then(() => {
                            res.send({ code: 200, content: "SUCCESSFULLY" })
                        }).catch((err) => {
                            res.send({ code: 401, content: "ADD USER FAIL" })
                        })
                } else {
                    res.send({ code: 404, content: "NOT FOUND" })
                }
            }).catch(err => {
                res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
            })
        } else {
            res.send({ code: 404, content: "NOT FOUND" })
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}

module.exports.getListUser = (req, res) => {
    Room.findOne({
        where: {
            name: req.body.nameRoom
        },
        include: {
            model: User
        }
    }).then((room) => {
        if (room) {
            res.send({ code: 200, content: "SUCCESSFULLY", room: room })
        } else {
            res.send({ code: 401, content: "get list user fail" })
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}

module.exports.deleteRoom = (req, res) => {
    Room.destroy({
        where: {
            name: req.body.nameRoom
        }
    }).then((result) => {
        if (result == 1) {
            res.send({ code: 200, content: "SUCCESSFULLY" })
        } else {
            res.send({ code: 404, content: "NOT FOUND" })
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}