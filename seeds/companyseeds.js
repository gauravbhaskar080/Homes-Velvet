const mongoose = require('mongoose');
const Company = require('./models/company');
const Object = require('./models/object');
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

const seedshelper= async function(){
    const comp = new Company();
    comp.companyname = 'Creative Homes';
    comp.totalbusines = 0;
    comp.paymentpending = 0;
    comp.paymentcleared = 0;
    await comp.save();
}
// seedshelper();