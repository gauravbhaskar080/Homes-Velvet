const mongoose = require('mongoose');
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

const Object = require('./models/object');
const Customer = require('./models/customer');

const addtocart = async function(custid,prid){
    const obj = await Object.findById(prid);
    const cust = await Customer.findById(custid);
    cust.cart.push(obj);
    await cust.save();
}

addtocart('6442c19cc038de4a3494d51c','644368f1626f1e295deb2355');