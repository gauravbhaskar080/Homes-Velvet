const mongoose = require('mongoose');
const Object = require('./models/object');
const Company = require('./models/company');
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
// const seedshelper = async function(){
//     const products = await Object.find();
//     const comp = await Company.findOne();
//     products.forEach(async function(pr){
//         pr.company = comp;
//         await pr.save();
//     });
// }
// seedshelper();