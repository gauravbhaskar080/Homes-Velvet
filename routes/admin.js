const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Delivery = require('../models/delivery');
const Company = require('../models/company');
const Account = require('../models/accounts');
const Customer = require('../models/customer');

const {isLoggedInAdmin} = require('../middleware');

async function match(plainPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return(match);
    } catch (error) {
      throw new Error(error);
    }
}

router.get('/',isLoggedInAdmin,async(req,res)=>{
    const account = await Account.findOne().populate('allcompanies').populate('pendingpayments');
    const delivery = await Delivery.find({status: 'Pending'}).populate('product').populate('customer');
    const customers = await Customer.find();
    const company = await Company.find();
    res.render('admin/adminhome',{account,delivery,customers,company});
})
router.get('/login',async(req,res)=>{
    res.render('admin/admin_login');
})
router.post('/login',async(req,res)=>{
    try{    
        const username=req.body.email;
        const password=req.body.password;
        const obj = await Account.findOne({ email: username });
        if(!obj){
            return res.render('/admin/login');
        }
        else{
            let check = await match(password,obj.password);
            if(check){
                req.session.isLoggedInAdmin = true;
                req.session.custid = obj._id;
                returnurl = req.session.returnTo || '/admin';
                res.redirect(returnurl);
            }else{
                return res.render('/admin/admin_login');
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err.message})
    }
})

router.get('/delivery/:id',isLoggedInAdmin, async (req,res)=>{
    const delivery =  await Delivery.findById(req.params.id).populate('product').populate('customer');

    res.render('admin/delivery',{delivery})
})
router.get('/logout',(req,res)=>{
    req.session.isLoggedInAdmin = false;
    req.session.custid = "";
    res.redirect('/admin/login');
})
router.get('/customers/:id',isLoggedInAdmin, async (req,res)=>{
    const customer =  await Customer.findById(req.params.id);

    res.render('admin/customer', {customer})
})

router.get('/company/:id', isLoggedInAdmin,async (req,res)=>{
    const company =  await Company.findById(req.params.id);

    res.render('admin/company', {company})
})

router.get('/clearpay/:id',isLoggedInAdmin,async(req,res)=>{
    const company = await Company.findById(req.params.id);
    const account = await Account.findOne()
    res.render('admin/pending',{company,account});
})
router.post("/clear-pay", (req, res) => {
    const companyId = req.body.companyId
    const accountId = req.body.accountId
    const amount = req.body.amount
    Company.findById(companyId).then((company) => {
        company.paymentpending -= amount
        company.save().then(() => {
            Account.findById(accountId).then((account) => {
                account.accountbal -= amount
                account.npp  -= 1
                account.companytotalpaypen -= amount
                account.save().then(() => {
                    Account.findByIdAndUpdate('6442ba16af729b5449e7d812',{$pull: {pendingpayments: companyId}});
                    res.redirect(`/admin`)
                })
            })
        })
    })
})
module.exports = router;