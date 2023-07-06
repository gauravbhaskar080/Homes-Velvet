const mongoose = require('mongoose');
const Account = require('./models/accounts');
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
const seedshelper = async function(){
    const acc = await Account.findOne();
    // acc.paywithdelivery = 0;
    // acc.accountbal = 0;
    // acc.totalbusiness = 0;
    // acc.profit = 0;
    // acc.npp = 0;
    acc.companytotalpaypen = 0
    await acc.save();
}
// seedshelper();
// const updateacc = async function(){
//     const acc = await Account.findOne();
//     acc.npp = 0;
//     await acc.save();
// }
// updateacc();
// const seedshelper = async function(){
//     const acc = await Account.findOne();
//     acc.profit = 41550;
//     await acc.save();
// }
// seedshelper();