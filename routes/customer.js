const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Tylecat = require('../models/tylecat');
const Furniturecat = require('../models/furniturecat');
const Sanitarycat = require('../models/sanitarycat');
const Object = require('../models/object');
const Artifact = require('../models/artifact');
const Paint = require('../models/paint');
const Delivery = require('../models/delivery');
const Company = require('../models/company');
const Account = require('../models/accounts');
const Customer = require('../models/customer');
const Design = require('../models/design');
const Homedesign = require('../models/homeprods');

const {isLoggedIn} = require('../middleware');


const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw,12);
    return hash;
}
async function match(plainPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return(match);
    } catch (error) {
      throw new Error(error);
    }
}
const placeorder = async function(objid,custid,qty){
    const margin = 0.95;
    const pr = await Object.findById(objid).populate('company');
    const comp = await Company.findById(pr.company._id);
    const cust = await Customer.findById(custid);
    const acc = await Account.findOne().populate('pendingpayments');
    const ttlbus = comp.totalbusines;
    comp.totalbusines = Math.ceil(ttlbus + (qty*pr.price));
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
    acc.paywithdelivery = acc.accountbal + (qty*pr.price);
    acc.totalbusiness = acc.totalbusiness + (qty*pr.price);
    acc.companytotalpaypen = Math.ceil(acc.companytotalpaypen + (qty*pr.price*margin));
    acc.profit += Math.ceil((1-margin)*(qty*pr.price));
    cust.bought.push(pr);
    await pr.save();
    await comp.save();
    await acc.save();
    await cust.save();
    return true;
}
router.get('/header/login_logout',(req,res)=>{
    if(req.session.isLoggedIn){
        req.session.isLoggedIn = false;
        req.session.custid = null;
        return res.redirect('/velvethomes');
    }else{
        res.redirect('/velvethomes/login');
    }
})
router.get('/login',async(req,res)=>{
    res.render('custlogin',{error:0});
})
router.post('/login',async(req,res)=>{
        try{    
            const username=req.body.email;
            const password=req.body.password;
            const obj = await Customer.findOne({ email: username });
            if(!obj){
                return res.render('custlogin', {error: 1})
            }
            else{
                let check = await match(password,obj.password);
                if(check){
                    req.session.isLoggedIn = true;
                    req.session.custid = obj._id;
                    returnurl = req.session.returnTo || '/velvethomes';
                    res.redirect(returnurl);
                }else{
                    return res.render('custlogin',{error:1});
                }
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({Error:err.message})
        }
})
router.post('/signup',async(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const phoneno=req.body.phoneno;
    const address=req.body.address;
    const pincode=req.body.pincode;
    const image=req.body.image;

    const hashedpassword = await hashPassword(password);
    const obj = Customer.findOne({ email: username });
    if(!obj){
        const cust = new Customer();
        cust.name = name;
        cust.email = email;
        cust.password = hashedpassword;
        cust.pnum = phoneno;
        cust.address = address;
        cust.pincode = pincode;
        cust.photo = image;
        await cust.save();
        return res.render('custlogin', {error: 0});
    }else{
        alert('Email Id already Exists. Please Log in into registered account!');
        return res.render('custlogin', {error: 0});
    }
})
router.get('/',async (req,res)=>{
    const homed = await Homedesign.findById('6444bc1abd0e682d089f8a4d').populate('tiles').populate('furniture').populate('sanitary').populate('artifacts').populate('paints');
    res.render('home',{homed});
})
router.get('/prodsubcat/:type',async(req,res)=>{
    const type = req.params.type;
    if(type==='furniture'){
        const designs = await Design.findById('6444c32470f9d72c84504466');
        const objects = await Furniturecat.find();
        return res.render('category', { designs, objects, type });
    }else if(type==='tile'){
        const designs = await Design.findById('6442d1b239121a281cf26502');
        const objects = await Tylecat.find();
        return res.render('category', { designs, objects, type });
    }else if(type==='sanitary'){
        const designs = await Design.findById('6444c33770f9d72c84504467');
        const objects = await Sanitarycat.find();
        return res.render('category', { designs, objects, type });
    }
})
router.get('/prodsubcat/:type/:id', async(req,res)=>{
    const type = req.params.type;
    if(type==='tile'){
        const products = await Tylecat.findById(req.params.id).populate('objects');
        res.render('list',{products: products});
    }else if(type==='furniture'){
        const products = await Furniturecat.findById(req.params.id).populate('objects');
        res.render('list',{products: products});
    }else if(type==='sanitary'){
        const products = await Sanitarycat.findById(req.params.id).populate('objects');
        res.render('list',{products: products});
    }else if(type==='artifacts'){
        const products = await Artifact.findOne().populate('objects');
        res.render('list',{products: products});
    }else if(type==='paints'){
        const products = await Paint.findOne().populate('objects');
        res.render('list',{products: products});
    }
})
router.get('/buyproduct/:id',isLoggedIn, async(req,res)=>{
    const product = await Object.findById(req.params.id);
    res.render('product',{product});
})
router.get('/bill/:prid',async(req,res)=>{
    const prd = await Object.findById(req.params.prid);
    res.render('bill',{prd});
})
router.post('/addtocart/:id',async(req,res)=>{
    const cust = await Customer.findById(req.session.custid);
    const obj = await Object.findById(req.params.id);
    cust.cart.push(obj);
    await cust.save();
    res.redirect('/velvethomes/cart');
})
router.post('/placeorder/singleprod/:id',async(req,res)=>{
    const bo = await placeorder(req.params.id,req.session.custid,1);
    res.redirect('/velvethomes');
})
router.get('/cart',isLoggedIn,async(req,res)=>{
    const customer = await Customer.findById(req.session.custid).populate('cart');
    res.render('cart',{customer});
})
router.post('/cart/remove/:id',async(req,res)=>{
    const reviewId = req.params.id;
    const id = req.session.custid;
    await Customer.findByIdAndUpdate(id,{$pull: {cart: reviewId}});
    res.redirect('/velvethomes/cart');
})
router.post('/cart/placeallorder',async(req,res)=>{
    const cust = await Customer.findById(req.session.custid).populate('cart');
    for(let prod of cust.cart){
        await placeorder(prod._id,req.session.custid,1);
        await Customer.findByIdAndUpdate(req.session.custid,{$pull: {cart: prod._id}});
    }
    res.redirect('/velvethomes/pinfo');
})
router.get('/pinfo', isLoggedIn,async (req, res) => {
    try {
    //   const customer = await Customer.findById(req.session.custid).populate({
    //     path: 'bought',
    //     populate:{
    //         path: 'product'
    //     }
    //   });
      const customer = await Customer.findById(req.session.custid).populate('bought');
    //   console.log(customer.bought[0].product[0]);
      res.render('custacc', { customer });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

module.exports = router;