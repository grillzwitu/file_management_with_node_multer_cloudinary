const { body } = require('express-validator');

// Defining registration validation rules
const validate = () => [
  body('username').notEmpty().withMessage('Please enter a valid username'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('name').notEmpty().withMessage('Please enter a valid name'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
          throw new Error('Passwords do not match');
      }
      return true;
  })
];

module.exports = { validate };
