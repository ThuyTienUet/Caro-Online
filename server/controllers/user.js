var jwt = require('jsonwebtoken');
var models = require('../database/db-connect');
var User = models.User;
var md5 = require('md5');

module.exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            password: md5(req.body.password)
        }
    }).then((user) => {
        if (user) {
            res.send({ code: 200, content: "SUCCESSFULLY", user: user })
        } else {
            res.send({code: 404, content: "NOT FOUND"})
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}

module.exports.register = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if (user == null) {
            User.create({
                username: req.body.username,
                password: md5(req.body.password),
                point: req.body.point
            }).then(user => {
                res.send({ code: 200, content: "SUCCESSFULLY", user: user })
            }).catch(err => {
                res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
            });
        } else 
            res.send({ code: 400, content: "REGISTER FAIL" })
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}

module.exports.updatePoint = (req, res) => {
    User.update(
        {point: 4},
        {where: {
            username: req.body.username
        }}
    ).then(user => {
        // if(user){
        //     user.dataValues.point = 3;
        // } else {
        //     res.send({code: 404, content: "NOT FOUND"})
        // }
    }).catch((err) => {
        // res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
        res.send({ code: 200, content: "SUCCESSFULLY"})
    })
}

module.exports.getListUser = (req, res) => {
    User.findAll({

    }).then(list => {
        if(list) {
            res.send({ code: 200, content: "SUCCESSFULLY", listUser: list })
        } else {
            res.send({code: 404, content: "NOT FOUND"})
        }
    }).catch((err) => {
        res.send({ code: 401, content: "SOMETHING WENT WRONG: " + err })
    })
}


