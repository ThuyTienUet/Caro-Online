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
        res.send({ code: 401, content: "Login successfully", user: user })
    }).catch((err) => {
        res.send({ code: 401, content: "Login fail" + err })
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
                console.log('register', user);
                res.send({ code: 200, content: "SUCCESSFULLY", user: user })
            }).catch(err => {
                console.error('register err', err);
                res.send({ code: 401, content: "Register fail" + err })
            });
        } else 
            res.send({ code: 401, content: "Register fail, username" })
    }).catch((err) => {
        res.send({content: err})
    })

}


