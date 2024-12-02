# Club Members Only

A Node.js web application that allows users to join an exclusive club, share messages, and manage memberships. The application features user authentication, admin privileges, and member-only content.

## Features

### User Management
- User registration and authentication
- Member and non-member status
- Admin privileges for selected users
- Secure password hashing using bcrypt

### Membership System
- Secret passcode required for membership
- Members-only message viewing
- Ability to join after registration using passcode

### Message System
- Create and view messages (members only)
- Admin privileges to delete messages
- Protected routes for non-members

### Admin Features
- Delete messages
- View and manage user list
- Delete users (except self)
- Monitor membership status

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: Passport.js, bcrypt
- **Frontend**: EJS templates, CSS
- **Other**: method-override for DELETE requests


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm package manager

### Installation

1. Clone the repository:

2. Install dependencies:

3. Create a `.env` file in the root directory:

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
SESSION_SECRET=your_session_secret


4. Set up the database:

## Database Schema

### Users Table
sql
CREATE TABLE "Users" (
id SERIAL PRIMARY KEY,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
username VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
membershipStatus BOOLEAN DEFAULT false,
isAdmin BOOLEAN DEFAULT false,
createdAt TIMESTAMP NOT NULL,
updatedAt TIMESTAMP NOT NULL
);


### Messages Table
sql
CREATE TABLE "Messages" (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
text TEXT NOT NULL,
userId INTEGER REFERENCES "Users"(id),
createdAt TIMESTAMP NOT NULL,
updatedAt TIMESTAMP NOT NULL
);


## API Routes

### Authentication Routes
- `POST /signup` - Register a new user
- `POST /login` - Authenticate user
- `GET /logout` - Log out user

### Message Routes
- `GET /` - Home page with messages (filtered by membership)
- `POST /messages` - Create new message
- `DELETE /messages/:id` - Delete message (admin only)

### Membership Routes
- `POST /join` - Submit passcode to gain membership

### Admin Routes
- `GET /users` - View all users (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## User Roles

### Regular User
- Can register and login
- Can view messages if membership status is approved
- Can create messages if membership status is approved

### Member
- All regular user privileges
- Can view all messages
- Can create new messages

### Admin
- All member privileges
- Can delete any message
- Can view list of all users
- Can delete other users
- Cannot delete own account

## Security Features

- Password hashing using bcrypt
- Session-based authentication
- Protected routes using middleware
- SQL injection protection through Sequelize
- XSS protection through EJS escaping
- CSRF protection through tokens

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Node.js and Express.js communities
- Sequelize ORM documentation
- Passport.js authentication middleware
- Bootstrap for styling inspiration

## Contact

Your Name - danielsackey564@gmail.com
Project Link: [https://github.com/adjiri564/club-members-only]