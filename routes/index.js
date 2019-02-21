
const express = require('express');
const router =  express.Router();


const {ensureAuthenticated} = require('../config/auth');



//welcome page
router.get('/', (req, res) =>{
    res.render('welcome');   
})
//dashboard page
router.get('/dashboard', ensureAuthenticated,(req, res) =>{
                            //to send user name object too dashboard page 
    res.render('Dashboard',{
        name: req.user.name
    });   
})


module.exports  = router;