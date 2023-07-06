const mongoose = require('mongoose');
const Customer = require('./models/customer');
const Company = require('./models/company');
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


async function match(plainPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      console.log(match);
    } catch (error) {
      throw new Error(error);
    }
}
const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw,12);
    console.log(hash);
}
// const newseedhelper = async function(){
//     const cust = Company.findOne({email: 'homedecor@gmail.com'});
//     // cust.password = await hashPassword(password);
//     // await cust.save();
//     console.log(cust);
// }
// newseedhelper();
// newseedhelper('6442c19cc038de4a3494d51c','ayush@gmail.com','ayush.adarsh');
// match('admin','$2b$12$eq3QMsuHANgj2j34/yHTm.0IvoE/kkzvqyso0qwLQmrD6ygEbLl06');
// hashPassword('admin');