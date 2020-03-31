const passport = require('passport');

const User = require('../models/user');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});


// Signup Strategy
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, 
    function(req, email, password, done){
        //validate email
     req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        // validate password
     req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
        // collect all errors is any exist
     let errors = req.validationErrors();
     
     // check if errors exist
     if (errors) {
         // if errors, pass the array of messages to the view
         let messages = [];
         // loop through the error and push the message to the array
         errors.forEach( (error) => {
             messages.push(error.msg);
         });
         // return the error to the view with flash
         return done (null, false, req.flash('error', messages));
     }

     // find the user by email
    User.findOne({'email': email}, function(err, user) {
        // check for error
        if (err) {
            return done(err);
        }
        // check if the user/email exists and flash a message if it does 
        if (user){
            return done(null, false, { message: 'Email is already in use'});
        }
        // create a new user if the user/email does not exist
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done (err);
            }
            return done(null, newUser);
        });
    });
}));


// sign in Strategy
passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //validate email
    req.checkBody('email', 'email cannot be empty').notEmpty();
    //validate password
    req.checkBody('password', 'Password cannot be empty').notEmpty();
    //collect all errors if any exist
    var errors = req.validationErrors();

    //checking if error exist
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });

        //returning the error to view with flash
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        if (!user){
            return done(null, false, {message: 'User does not exist'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong Password'});
        }
        return done(null, user);
    });
}));

