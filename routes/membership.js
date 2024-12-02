const express = require('express');
const User = require('../models/user');
const router = express.Router();

//create new message
router.post('/join', async(req, res) => {
    try{
        const {passcode} = req.body;
        const user = await User.findByPk(req.user.id);

        if(passcode === 'i will be rich'){
            user.membershipStatus = true;
            await user.save();
            res.redirect('/');
        } else {
            res.status(400).send('Invalid passcode')
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
})

module.exports = router;