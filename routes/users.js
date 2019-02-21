
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// bringh mangose modal here 
const User = require('../models/User');

router.get('/forgotpassword', (req, res)=>{
    res.render('forgotpsss');
})

router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/register', (req, res) => {
    res.render('register');
})

// Login handles
router.post('/login', (req, res, next) =>{
        passport.authenticate('local',{
            successRedirect:'/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next)
})

//logout handle
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You have been logged out successfully');
    res.redirect('/users/login');
})


//registration handle
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
                    errors.push({msg : 'This Email Address is already taken'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        pass,
                        pass2
                    });
                } else {
                    //New USer
                    const newUser = new User({
                        name,
                        email,
                        password: pass
                    });

                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                            // console.log(hash);
                            if(err) throw err;
                            //set password hash
                            newUser.password = hash;
                            newUser.save().then(user=>{

                                //flash message:
                                req.flash('success_msg', 'Registration success..!, Now you can login...!! ');

                                res.redirect('/users/login');
                            }).catch(err=>console.log(err));

                    }))
                    // console.log(newUser);
                    // res.send('hello')
                }
            });

    }

})


module.exports = router;