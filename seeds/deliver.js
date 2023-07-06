const mongoose = require('mongoose');
const Object = require('./models/object');
const Company = require('./models/company');
const Account = require('./models/accounts');
const Customer = require('./models/customer');
const Delivery = require('./models/delivery');
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
const delivered = async function(id){
    const del = await Delivery.findById(id).populate('customer').populate('product');
    const acc = await Account.findOne();
    const prod= Object.findById(del.product._id);
    await Customer.findByIdAndUpdate(del.customer._id,{$pull: {notdelivered: prod._id}}); 
    await Customer.findByIdAndUpdate(del.customer._id,{$push: {bought: prod}});
    acc.paywithdelivery = (acc.paywithdelivery - (del.payment));
    acc.accountbal = (acc.accountbal + del.payment);
    del.status = "Delivered";
    del.payment = 0;
    await acc.save();
    await del.save();
}
// delivered('642406a8bddc8a482abe490f');
