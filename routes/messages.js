const Message = require('../models/message');
const router = require('./membership');

router.post('/messages', async (req, res) => {
    console.log('Received data:', req.body); 
    try {
        const { title, text} = req.body; // Ensure you are getting the correct data
        const userId = req.session.userId;
        console.log('Title:', title, 'Text:', text, 'User ID:', userId);

        if (!title || !text || !userId) {
            return res.status(400).send('Title, text, and userId are required.');
        }

        const newMessage = await Message.create({ title, text, userId });
        console.log('New message created:', newMessage);
        res.redirect('/'); // Redirect to home or wherever you want after creating the message
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).send('Internal Server Error'); // Send an error response
    }
});

const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()
    } else{
        res.status(403).send('Access denied. Admin previleges required')
    }
}

router.delete('/messages/:id', isAdmin, async (req, res) => {
    try{
        const message = await Message.findByPk(req.params.id);
        if(!message){
            return res.status(404).send('Message not found');
        }
        await message.destroy();
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Error deleting message');
    }
});

module.exports = router;