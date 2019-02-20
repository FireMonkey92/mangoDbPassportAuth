
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

// bringh mangose modal here 
const User = require('../models/User');



router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/register', (req, res) => {
    res.render('register');
})


router.post('/register', (req, res) => {

    const { name, email, pass, pass2 } = req.body;
    let errors = [];

    //Chelck weather empty fields
    if (!name || !email || !pass || !pass2) {
        errors.push({ msg: 'Please fill the all fields' })
    }
    if (pass !== pass2) {
        errors.push({ msg: 'Passwords does not matched' });
    }
    //check pass length
    if (pass.length < 6) {
        errors.push({ msg: 'Passwords length shold be atleast 6 chars' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            pass,
            pass2
        })
    } else {
        // validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists
                    errors.push('This Email Address is already taken');
                    res.render('register', {
                        errors,
                        name,
                        email,
                        pass,
                        pass2
                    });
                } else {
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: pass
                    });

                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {

                    }))

                    console.log(newUser);
                    res.send('hello')
                }
            });

    }

})


module.exports = router;