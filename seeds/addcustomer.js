const mongoose = require('mongoose');
const Customer = require('./models/customer');
const bcrypt = require('bcrypt');

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

const seedshelper = async function(name,pnum,address,pincode,photo){
    const cust = new Customer();
    cust.name = name;
    cust.pnum = pnum;
    cust.address = address;
    cust.pincode = pincode;
    cust.photo = photo;
    await cust.save();
}
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw,12);
    return hash;
}
const newseedhelper = async function(custid,email,password){
    const cust = Customer.findById(custid);
    cust.email = email;
    cust.password = hashPassword(password);
    await cust.save();
}
newseedhelper('6442c19cc038de4a3494d51c','ayush@gmail.com','ayush.adarsh')
// seedshelper('Ayush Adarsh','9142450324','Gola Road, Patna',801503,'https://thumbs.dreamstime.com/b/taj-mahal-agra-india-morning-light-reflection-water-uttar-pradesh-108954918.jpg');
// seedshelper('Virendra Yadav','8789145236','Dadar, Mumbai',400014,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqeCACGi5kJgniwHo0vVE1-GOuZYYTKlCfd3vROmOVA&usqp=CAU&ec=48665701');
// seedshelper('Gaurav Bhaskar','9999536005','Qutub Vihar,Dwarka',110071,'https://cdn.pixabay.com/photo/2017/11/06/09/53/tiger-2923186__480.jpg');