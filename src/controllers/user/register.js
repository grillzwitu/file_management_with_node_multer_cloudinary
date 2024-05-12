const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../../models/users');

exports.register = async (req, res) => {
    try {
        // Extracting data from the request body
        const { username, email, name, password, password2 } = req.body;

        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if username exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).send('Username already exists');
        }

        // Check if email exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).send('Email already exists');
        }

        // Create the new user
        const newUser = new User({
            username,
            email,
            name,
            password
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;

        // Save the new user
        const savedUser = await newUser.save();
        res.redirect(201, 'pages/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

};
