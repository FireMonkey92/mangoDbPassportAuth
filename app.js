const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');



const app = express();

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

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started @ port : ${PORT}`))