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

const Tylecat = require('./models/tylecat');
const Furniturecat = require('./models/furniturecat');
const Sanitarycat = require('./models/sanitarycat');
const Object = require('./models/object');
const Artifact = require('./models/artifact');
const Paint = require('./models/paint');
const Company = require('./models/company');

const addfurnitureproducts = async function(compid,catid,title,price,dispimg,description){
    const comp = await Company.findById(compid);
    const Cat = await Furniturecat.findById(catid);
    const obj = new Object();
    obj.title = title;
    obj.price = price;
    obj.dispimg = dispimg;
    obj.description = description;
    obj.company = comp;
    await obj.save();
    comp.products.push(obj);
    Cat.objects.push(obj);
    await comp.save();
    await Cat.save();
}
const addfurnitureproducts1 = async function(compid,catid,title,price,cat,dispimg,description,p1,p2,p3,p4){
    const comp = await Company.findById(compid);
    const Cat = await Furniturecat.findById(catid);
    const obj = new Object();
    obj.title = title;
    obj.price = price;
    obj.cat = cat;
    obj.dispimg = dispimg;
    obj.description = description;
    obj.company = comp;
    obj.images.push(p1);
    obj.images.push(p2);
    obj.images.push(p3);
    obj.images.push(p4);
    await obj.save();
    comp.products.push(obj);
    Cat.objects.push(obj);
    await comp.save();
    await Cat.save();
}
// addfurnitureproducts1('6442bda931cb0080d46c4e6b','6442c7605752a70cdc112653','',,'Bed',,"Our premium Bed offers the ultimate in comfort and support for a restful night's sleep. The solid wood frame is finished with a plush fabric, while the tall, padded headboard is perfect for lounging. The high-density memory foam mattress contours to your body and features cooling technology. Achieve the sleep you deserve with our innovative and stylish Bed.",);

// addfurnitureproducts('6442e710e4307aa0cf8ae9ad','6442c7605752a70cdc112653','',,'Bed','',"Our premium Bed offers the ultimate in comfort and support for a restful night's sleep. The solid wood frame is finished with a plush fabric, while the tall, padded headboard is perfect for lounging. The high-density memory foam mattress contours to your body and features cooling technology. Achieve the sleep you deserve with our innovative and stylish Bed.");


// addfurnitureproducts('6442e74c9efdc363ebcf5508','6442c7605752a70cdc112653','',,'Bed','',"Our premium Bed offers the ultimate in comfort and support for a restful night's sleep. The solid wood frame is finished with a plush fabric, while the tall, padded headboard is perfect for lounging. The high-density memory foam mattress contours to your body and features cooling technology. Achieve the sleep you deserve with our innovative and stylish Bed.");








const addimage = async function(objid){
    const obj = await Object.findById(objid);
    obj.images.push('https://cb2.scene7.com/is/image/CB2/CantarIvoryVelvetQBedAVSHS23/$web_pdp_main_carousel_md$/230329042459/CantarIvoryVelvetQBedAVSHS23.jpg');
    obj.images.push('https://cb2.scene7.com/is/image/CB2/CantarIvoryVelvetQBed3QSSS23/$web_pdp_main_carousel_md$/230329042459/CantarIvoryVelvetQBed3QSSS23.jpg');
    obj.images.push('https://cb2.scene7.com/is/image/CB2/CantarIvoryVelvetQBedSDSSS23/$web_pdp_main_carousel_md$/230329042459/CantarIvoryVelvetQBedSDSSS23.jpg');
    obj.images.push('https://cb2.scene7.com/is/image/CB2/CB2SP23_10K_hero/$web_pdp_main_carousel_md$/230329032831/CB2SP23_10K_hero.jpg');
    await obj.save();
}
// addimage('64436719dd44e4dc42927028');








// const addtilesproducts = async function(compid,catid,title,price,cat,dispimg,description){
//     const comp = await Company.findById(compid);
//     const Cat = await Tylecat.findById(catid);
//     const obj = new Object();
//     obj.title = title;
//     obj.price = price;
//     obj.cat = cat;
//     obj.dispimg = dispimg;
//     obj.description = description;
//     obj.company = comp;
//     comp.products.push(obj);
//     Cat.objects.push(obj);
//     await obj.save();
//     await comp.save();
//     await Cat.save();
// }
// const addsanitaryproducts = async function(compid,catid,title,price,cat,dispimg,description){
//     const comp = await Company.findById(compid);
//     const Cat = await Sanitarycat.findById(catid);
//     const obj = new Object();
//     obj.title = title;
//     obj.price = price;
//     obj.cat = cat;
//     obj.dispimg = dispimg;
//     obj.description = description;
//     obj.company = comp;
//     comp.products.push(obj);
//     Cat.objects.push(obj);
//     await obj.save();
//     await comp.save();
//     await Cat.save();
// }
// const addartifactproducts = async function(compid,title,price,cat,dispimg,description){
//     const comp = await Company.findById(compid);
//     const Cat = await Artifact.findOne();
//     const obj = new Object();
//     obj.title = title;
//     obj.price = price;
//     obj.cat = cat;
//     obj.dispimg = dispimg;
//     obj.description = description;
//     obj.company = comp;
//     comp.products.push(obj);
//     Cat.objects.push(obj);
//     await obj.save();
//     await comp.save();
//     await Cat.save();
// }
// const addpaintproducts = async function(compid,title,price,cat,dispimg,description){
//     const comp = await Company.findById(compid);
//     const Cat = await Paint.findOne();
//     const obj = new Object();
//     obj.title = title;
//     obj.price = price;
//     obj.cat = cat;
//     obj.dispimg = dispimg;
//     obj.description = description;
//     obj.company = comp;
//     comp.products.push(obj);
//     Cat.objects.push(obj);
//     await obj.save();
//     await comp.save();
//     await Cat.save();
// }