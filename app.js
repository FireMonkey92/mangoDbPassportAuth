const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport =  require('passport');

const app = express();
// passport config

require ('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;
//Connect To Mongoose
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=>console.log('Mongo DB Connected...'))
    .catch(err => console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// bodyParser (We get the data from form so..)
app.use(express.urlencoded({extended:false})); 

//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect Flash
app.use(flash());



// global vars
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})



// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started @ port : ${PORT}`))