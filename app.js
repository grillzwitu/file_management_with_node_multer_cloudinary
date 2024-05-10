const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');


//Initialize app and configurations
const app = express();
var cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

// Initialize environment variables
const dotenv = require('dotenv');
dotenv.config();

// Define and Initialize passport authentication
require('./src/config/passport')(passport);

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/* Initialize path for routes */
app.use("/", require("./src/routes"));

//Connect DB and start app
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
})
