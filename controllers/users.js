const express = require('express')
const User = require('../model/user')
const userProgress = require('../model/userProgress')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const registerUser = async (req, res) => {
    var encryptedPassword;
    await bcrypt.hash(req.body.Password, 10).then(hash => {

        encryptedPassword = hash;
    }).catch(err => {
        res.status(400).send({ "error": err });
    });

    const user = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: encryptedPassword,
        Age: req.body.Age
    });
    var isExist = await checkUser(req.body.Email);
    if (isExist == true) {
        res.status(200).send("User already Exists");
    }
    else {
        await user.save().
            then(async result => {
                const up = new userProgress({ uid: String(user._id) });
                await up.save().then().catch(err => { res.status(400).send({ 'err': err }); return; });
                res.status(200).json({ "User": result });
            })
            .catch(error => { res.status(400).json({ "err": error }); });

    }

};


const userLogin = (req, res) => {
    User.findOne({ Email: req.body.Email }).then(user => {
        if (user != null) {
            bcrypt.compare(req.body.Password, user.Password).then(match => {
                if (!match) {
                    res.status(400).send({ 'error': 'Password do not match' });
                }
                else {
                    const accessToken = sign({ email: user.Email, id: user._id, name: user.Name }, process.env.JWT, {
                        expiresIn: "30d",
                    });
                    res.status(200).send({ 'token': accessToken });
                }

            })
        }
        else {
            res.status(400).send({ 'error': 'User does not exsits' });
        }
    }).catch(err => {
        res.status(400).send({ 'error': err });
    });
}





const checkUser = async (email) => {
    var isExist = false;
    await User.findOne({ Email: email }).then(user => {
        if (user != null) {
            isExist = true;
        }

    });
    console.log("dopjf " + isExist);
    return isExist;
}



const addLetter = async (req, res) => {
    userProgress.findOne({ uid: req.body.uid }).then(async (curr_user) => {

        if (curr_user) {
            var letters = curr_user.Letters;
            letters.push(req.body.Letter);

            try {
                await userProgress.updateOne({ uid: req.body.uid }, { Letters: letters });
                res.status(200).send('Letter added successfully');
            }
            catch (err) {
                res.status(400).send({ 'err': err });
                return;
            }

        }


        else {
            res.status(400).send('no such user');
        }





    }).catch(err => res.status(400).send({ 'err': err }));
}

const getLetter = async (req, res) => {
    userProgress.findOne({ uid: req.body.uid }).then((user) => {
        res.status(200).send({ 'letters': user.Letters });

    }).catch(err => res.status(400).send({ 'err': err }));
}

const getAllUsers = async (req, res) => {
    try {
        var users = await User.find();
        res.send(users);
    } catch (error) {
        res.send(error);
    }

}

// to add new field of 'Role' with value 'Viewer' to all existing records.
const updateUser = async(req,res) =>{
    try {
        const users = await User.updateMany({},{$set: {Role : "Viewer"}});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

const makeAdmin = async(req,res) =>{
    try {
        const user = await User.updateOne({_id : req.params.id}, {$set : {Role : "Admin"}});
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = { registerUser, userLogin, addLetter, getLetter,getAllUsers, updateUser, makeAdmin };