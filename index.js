const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const {isLoggedIn,isLoggedInCompany} = require('./middleware');

const customerRoutes = require('./routes/customer');
const companyRoutes = require('./routes/company');
const adminRoutes = require('./routes/admin');

mongoose.connect('mongodb+srv://gaurav:bhaskar@cluster0.loujksv.mongodb.net/velvet_homes?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology : true
})
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret: 'velvethomesFFSDProject',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));


app.use('/velvethomes',customerRoutes);
app.use('/seller',companyRoutes);
app.use('/admin',adminRoutes);

app.listen(3000,()=>{
    console.log('Serving on port 3000');
})