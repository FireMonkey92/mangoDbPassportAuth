const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user modal created in modal 
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'email'} ,(email, password, done)=>{
            // match user 
            User.findOne({email : email})
                .then(user=>{
                    if(!user){
                        return done(null, false,{ message : 'Email not registered'})
                    }
                    else{
                        //match password
                        bcrypt.compare(password, user.password , (err,isMatches) =>{
                             if(err) throw err;
                             if(isMatches){
                                 // user is passed 
                                 return done(null, user);
                             }
                             else{
                                 return done(null, false , {message: 'Incorrect Password..!!'})
                             }
                        });

                    }
                }).catch(err=>console.log(err));

        })
    );

    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user); 
        });
      });

}