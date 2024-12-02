const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport')

router.get('/signup', (req,res)=>{
    res.render('signup');
})

router.post('/signup', async(req,res) => {
    const {firstName, lastName, email, username, password, confirmPassword, isAdmin, passcode} = req.body;

    //validate and sanitize inputs
    if(password !== confirmPassword){
        return res.status(400).send('Passwords do not match');
    }

     // Check passcode
     const membershipStatus = passcode === 'i will be rich' ? true : false;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await User.create({firstName, lastName, email, username, password: hashedPassword, membershipStatus: membershipStatus,isAdmin: isAdmin === 'on'? true:false});
        res.redirect('/login');
    } catch(err){
        console.error('Error creating user:', err); // Log the error
        res.status(500).send('Error creating user')
    }
});

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('Login attempt:', { 
            username: req.body.username,
            error: err,
            user: user,
            info: info 
        });

        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('User not found:', info.message);
            return res.redirect('/login'); // Redirect back to login if user not found
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            req.session.userId = user.id; // Store user ID in session
            console.log('User logged in:', user.username);
            return res.redirect('/'); // Redirect to home
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Error logging out');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/login'); // Redirect to login page after logout
        });
    });
});

module.exports = router;
