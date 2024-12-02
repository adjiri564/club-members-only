
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const Message = require('../models/message');

router.get('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/login');
        }

        const messages = await Message.findAll();
        
        res.render('home', {
            user: req.user,
            messages: req.user.membershipStatus ? messages : [],
            showJoinButton: !req.user.membershipStatus
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;