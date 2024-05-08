const express = require('express');
const app = express();
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

const dotenv = require('dotenv');
dotenv.config();

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



/* Initializing the path for routes */
//app.use("/", require("./src/routes"));

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
})

//global.dbconn = "";

/* Connect the app with mongoose */ 
// mongoose.connect(
//     process.env.MONGO_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (client, err) =>{
//         try{
//             console.log("Connected to db: " + client)
//         }catch(err){
//             console.log(err);
//         }
//     }
// )

/* Setting up server */ 
// app.listen(process.env.PORT, function(){
//     console.log("This server running");
// })
