// path/to/your/passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt')

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Configure local strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'username', // Change this if your field is different
        passwordField: 'password'  // Change this if your field is different
    },
    async (username, password, done) => {
        try {
            console.log('Attempting to find user:', username);
            const user = await User.findOne({ where: { username } });
            if (!user) {
                console.log('User not found:', username);
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Here you should compare the password (e.g., using bcrypt)
            // if (user.password !== password) { // Replace with hashed password check
            //     return done(null, false, { message: 'Incorrect password.' });
            // }
            // Compare passwords using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password comparison:', { 
                isMatch: isMatch, 
                providedPassword: password,
                storedHash: user.password 
            });

            if (!isMatch) {
                console.log('Invalid password for user:', username);
                return done(null, false, { message: 'Incorrect password.' });
            }

            console.log('User authenticated successfully:', username);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

module.exports = passport;