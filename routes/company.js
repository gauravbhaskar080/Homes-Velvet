const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Tylecat = require('../models/tylecat');
const Furniturecat = require('../models/furniturecat');
const Sanitarycat = require('../models/sanitarycat');
const Artifact = require('../models/artifact');
const Paint = require('../models/paint');
const Object = require('../models/object');
const Company = require('../models/company');

const {isLoggedInCompany} = require('../middleware');

const addtilesproducts = async function(compid,catid,title,price,dispimg,description,type){
    const comp = await Company.findById(compid);
    let Cat;
    if(type=='tile'){
        Cat = await Tylecat.findById(catid);
    }else if(type=='furniture'){
        Cat = await Furniturecat.findById(catid);
    }else if(type=='sanitary'){
        Cat = await Sanitarycat.findById(catid);
    }else if(type==='artifacts'){
        Cat = await Artifact.findOne();
    }else{
        Cat = await await Paint.findOne();
    }
    const obj = new Object();
    obj.title = title;
    obj.price = price;
    obj.dispimg = dispimg;
    obj.description = description;
    obj.company = comp;
    comp.products.push(obj);
    Cat.objects.push(obj);
    await obj.save();
    await comp.save();
    await Cat.save();
}

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

router.get('/login',(req,res)=>{
    req.session.returnTo = "";
    return res.render('company/company_login');
})
router.post('/login',async(req,res)=>{
    try{    
        const username=req.body.email;
        const password=req.body.password;
        const obj = await Company.findOne({ email: username });
        if(!obj){
            return res.render('company/company_login');
        }
        else{
            let check = await match(password,obj.password);
            if(check){
                req.session.isLoggedInCompany = true;
                req.session.custid = obj._id;
                returnurl = req.session.returnTo || `/seller/${obj._id}`;
                res.redirect(returnurl);
            }else{
                return res.render('company/company_login');
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err.message})
    }
})
router.get('/signup',(req,res)=>{
    return res.render('company/company_signUp');
})
router.post('/signup',async(req,res)=>{
    const name=req.body.companyname;
    const email=req.body.email;
    const password=req.body.password;
    const gstnumber=req.body.gstnumber;

    const hashedpassword = await hashPassword(password);
    const obj = Company.findOne({ email: username });
    if(!obj){
        const cust = new Company();
        cust.name = name;
        cust.email = email;
        cust.password = hashedpassword;
        cust.gstnum = gstnumber;
        await cust.save();
        return res.render('company/company_login');
    }else{
        return res.render('company/company_signup');
    }
}) 
router.get('/logout',(req,res)=>{
    req.session.isLoggedInCompany = false;
    return res.redirect('/seller/login');
})
router.get('/:id',isLoggedInCompany, async (req,res)=>{
    const company = await Company.findById(req.params.id).populate('products');
    res.render('company/c1',{company});
})
router.get('/:id/:type',isLoggedInCompany,async(req,res)=>{
    const type = req.params.type;
    const company = await Company.findById(req.params.id);
    res.render('company/newtiles',{type,company});
})
router.post('/:type/:id/addpr',async(req,res)=>{
    const type = req.params.type;
    const id = req.params.id;
    if(type==='tile'){
        await addtilesproducts(id,req.body.prtype,req.body.title,req.body.price,req.body.dispimg,req.body.description,'tile');
        return res.redirect(`/seller/${id}`);
    }else if(type==='furniture'){
        await addtilesproducts(id,req.body.prtype,req.body.title,req.body.price,req.body.dispimg,req.body.description,'furniture');
        return res.redirect(`/seller/${id}`);
    }else if(type==='sanitary'){
        await addtilesproducts(id,req.body.prtype,req.body.title,req.body.price,req.body.dispimg,req.body.description,'sanitary');
        return res.redirect(`/seller/${id}`);
    }else if(type==='artifact'){
        await addtilesproducts(id,req.body.prtype,req.body.title,req.body.price,req.body.dispimg,req.body.description,'artifacts');
        return res.redirect(`/seller/${id}`);
    }else{
        await addtilesproducts(id,req.body.prtype,req.body.title,req.body.price,req.body.dispimg,req.body.description,'paints');
        return res.redirect(`/seller/${id}`);
    }
})
router.get('/:id/edit/:pid',isLoggedInCompany,async(req,res)=>{
    const product = await Object.findById(req.params.pid);
    const company = await Company.findById(req.params.id);
    res.render('company/edit',{product,company});
})
router.post('/updateprod/:id',async(req,res)=>{
    const product = await Object.findById(req.params.id);
    product.title = req.body.title;
    product.dispimg = req.body.dispimg;
    product.description = req.body.description;
    product.price = req.body.price;
    await product.save();
    res.redirect(`/seller/${req.session.custid}/edit/${req.params.id}`);
})
router.post('/:id/addimg',async(req,res)=>{
    const product = await Object.findById(req.params.id);
    product.images.push(req.body.img);
    await product.save();
    res.redirect(`/seller/${req.session.custid}/edit/${req.params.id}`);
})

module.exports = router;