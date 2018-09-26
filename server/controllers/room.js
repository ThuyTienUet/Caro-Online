var models = require('../database/db-connect');
var Room = models.Room;
var User = models.User;

module.exports.createRoom = (req, res) => {
    User.findOne({
        where: {
            username: req.body.name
        }
    }).then((user) => {
        if (user) {
            Room.findOne({
                where: {
                    name: user.dataValues.username
                }
            }).then((room) => {
                if (room == null) {
                    Room.create({
                        name: user.dataValues.username
                    }).then((room) => {
                        room.addUsers([user.dataValues.id]);
                        res.send({ code: 200, content: "create room success" })
                    })
                } else {
                    res.send({ code: 401, content: "create room fail" })
                }
            }).catch((err) => {
                res.send({ code: 401, content: err })
            })
        } else {
            res.send({ code: 401, content: "reate room fail" })
        }
    }).catch((err) => {
        res.send({ code: 401, content: err })
    })
}

module.exports.getListUser = (req, res) => {
    Room.findOne({
        where: {
            name: req.body.name
        },
        include: {
            model: User
        }
    }).then((room) => {
        console.log('get list user', room.dataValues.User);
    })
}