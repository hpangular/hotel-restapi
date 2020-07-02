const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('./validation')
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res) => {


    //let validate the data before we a user 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error);

    // email is exist in db
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('User Is already registered .... ');

    // password ahshed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
        res.json({
            message: 'Registration is succesfully...!',
            id: savedUser._id
        });
    } catch (error) {
        res.json(
            {
                message: error

            })
    }
});

router.post('/login', async (req, res) => {
    //let validate the data before we a user 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error);

    // email is exist in db
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email Incorrect...');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('password Incorrect...');

    const token = jwt.sign({userId:user._id} , process.env.JWT_Token)
    res.header('auth_token', token).send(token)
});

module.exports = router;