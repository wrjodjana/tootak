const express = require('express');
const { add } = require('nodemon/lib/rules');
const { registerUser, userLogin, addLetter, getLetter, getAllUsers, updateUser, makeAdmin } = require('../controllers/users')
const router = express.Router()

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/addLetter').post(addLetter);
router.route('/getLetter').get(getLetter);
router.route('/getUsers').get(getAllUsers);
router.route('/update').put(updateUser);
router.route('/updateRole/:id').put(makeAdmin);


module.exports = router

