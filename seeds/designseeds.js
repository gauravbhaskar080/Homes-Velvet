const mongoose = require('mongoose');
const Design = require('./models/design');
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

// const addimage = async function(){
    // const sofa = new Design();
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/E00000001278.jpg')
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/E00000001356.jpg')
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/E00000001186.jpg')
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/E00000001073.jpg')
    
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/E00000001291.jpg')
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/high002327.jpg')
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/high002403.jpg') 
    // sofa.dispimg.push('https://www.kajariaceramics.com/concept-picture/high002638.jpg') 
    // sofa.title = 'Furniture';
    // await sofa.save();
// }
// addimage(); 