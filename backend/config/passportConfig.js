const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var User = require('../model/users');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email: email },
                (err, user) => {
                    if (err)
                        return done(err);
                    
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                   
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    
                    else
                        return done(null, user);
                });
        })
);
