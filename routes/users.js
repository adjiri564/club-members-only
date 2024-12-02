// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isAuthenticated} = require ('../middleware/auth')

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send('Access denied. Admin privileges required.');
    }
};

// Get all users (admin only)
router.get('/users', isAdmin, isAuthenticated, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'membershipStatus', 'isAdmin']
        });
        res.render('users', { users, currentUser: req.user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Delete user (admin only)
router.delete('/users/:id', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Prevent admin from deleting themselves
        if (userId === req.user.id.toString()) {
            return res.status(400).send('Cannot delete your own account');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        await user.destroy();
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;