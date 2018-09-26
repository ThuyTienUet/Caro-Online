let express = require('express');
let router = express.Router();

let ctrlUser = require('../controllers/user');
let ctrlRoom = require('../controllers/room');
router.post('/login', (req, res) => {
    ctrlUser.login(req, res);
})
router.post('/register', (req, res) => {
    ctrlUser.register(req, res);
})

router.post('/room/add', (req, res) => {
    ctrlRoom.createRoom(req, res);
})
router.post('/room/listUser', (req, res) => {
    ctrlRoom.getListUser(req, res);
})
module.exports = router;