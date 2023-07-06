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
const placeorder = async function(objid,custid,qty,address){
    const margin = 0.95;
    const pr = await Object.findById(objid).populate('company');
    const comp = await Company.findById(pr.company._id);
    const cust = await Customer.findById(custid);
    const acc = await Account.findOne().populate('pendingpayments');
    pr.buyers.push(cust);
    const ttlbus = comp.totalbusines;
    comp.totalbusines = Math.ceil(ttlbus + (qty*pr.price*margin));
    const penpay = comp.paymentpending;
    comp.paymentpending = Math.ceil(penpay + (qty*pr.price*margin));
    let check = 0;
    for(let pen of acc.pendingpayments){
        if(pen.companyname===comp.companyname){
            check = 1;
        }
    }
    if(check===0){
        acc.pendingpayments.push(comp);
        acc.npp = acc.npp + 1;
    }
    acc.paywithdelivery = acc.paywithdelivery + (qty*pr.price);
    acc.totalbusiness = acc.totalbusiness + (qty*pr.price);
    acc.companytotalpaypen = Math.ceil(acc.companytotalpaypen + (qty*pr.price*margin));
    acc.profit += (1-margin)*(qty*pr.price);
    const del = new Delivery();
    del.product = pr;
    del.quantity = qty;
    del.deliveryaddress = address;
    del.payment = (qty*pr.price);
    del.customer = cust;
    del.status = "Pending";
    del.productid = pr._id;
    cust.notdelivered.push(pr);
    await pr.save();
    await comp.save();
    await acc.save();
    await del.save();
    await cust.save();
}
// placeorder('644386cc0141c4851f42193b','6442c19cc038de4a3494d51c',1,'Gola Road, Patns, 801503');