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
const pay = async function(cid,amount){
    const acc = await Account.findOne();
    const comp = await Company.findById(cid);
    if(acc.accountbal<amount){
        console.log('Insuffient Bal');
    }
    else if(amount>comp.paymentpending){
        console.log('Paying Extraa');
    }
    else if(comp.paymentpending===amount){
        acc.npp = acc.npp - 1;
    }
    else{
        acc.accountbal = (acc.accountbal - amount);
        acc.companytotalpaypen = (acc.companytotalpaypen - amount);
        comp.paymentpending = (comp.paymentpending - amount);
        comp.paymentcleared = (comp.paymentcleared + amount);
        await acc.save();
        await comp.save();
    }
}
// pay('640f439857d0f8196dc16b8a',150000);