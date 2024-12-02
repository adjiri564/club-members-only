// path/to/your/populate.js
const sequelize = require('./config/database');
const User = require('./models/user');
const Message = require('./models/message');

async function populateDatabase() {
    try {
        // Sync the models with the database
        await sequelize.sync({ force: true }); // Use force: true to drop existing tables

        // Create users with all required fields
        const user1 = await User.create({ 
            firstName: 'John', 
            lastName: 'Doe', 
            username: 'user1', 
            email: 'user1@example.com', 
            password: 'password123' // Ensure to provide a password
        });
        const user2 = await User.create({ 
            firstName: 'Jane', 
            lastName: 'Smith', 
            username: 'user2', 
            email: 'user2@example.com', 
            password: 'password456' // Ensure to provide a password
        });

        // Create messages
        await Message.create({ title: 'Hello World', text: 'This is a message.', userId: user1.id });
        await Message.create({ title: 'Another Message', text: 'This is another message.', userId: user2.id });

        console.log('Database populated successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await sequelize.close(); // Close the connection
    }
}

populateDatabase();