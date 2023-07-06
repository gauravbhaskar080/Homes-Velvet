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

const Homedesign = require('./models/homeprods');
const Object = require('./models/object');

const seedhelper = async function(){
    const o1 = await Object.findById('644404c7b09166fcf6c31909');
    const o2 = await Object.findById('644407262bdf9c33f9d405f0');
    const o3 = await Object.findById('644409f5ea3fe165376901d6');
    const o4 = await Object.findById('64440738fcbcb3eb044617eb');
    const o5 = await Object.findById('6443f27d83c65a1efb37e71d');
    const o6 = await Object.findById('6443f37efe376a5c77881ea7');
    const homed = new Homedesign();
    homed.tiles.push(o1);
    homed.tiles.push(o2);
    homed.tiles.push(o3);
    homed.tiles.push(o4);
    homed.tiles.push(o5);
    homed.tiles.push(o6);
    const o7 = await Object.findById('644399f4523a2ad4f34b68f4');
    const o8 = await Object.findById('644387c690a3d7a29d9593c6');
    const o9 = await Object.findById('6443949b303242756c01b00a');
    const o10 = await Object.findById('64436ae53e74ffa949d1ee50');
    const o11 = await Object.findById('644386cc0141c4851f42193b');
    const o12 = await Object.findById('6443921a5ce179ffe80eedb7');
    homed.furniture.push(o7);
    homed.furniture.push(o8);
    homed.furniture.push(o9);
    homed.furniture.push(o10);
    homed.furniture.push(o11);
    homed.furniture.push(o12);
    const o13 = await Object.findById('6443e659d492faa8d5d5e4c7');
    const o14 = await Object.findById('6443b7578ae66fc063ecc382');
    const o15 = await Object.findById('6443e11c14cead894a320b8c');
    const o16 = await Object.findById('6443c3447ed73ac0655a22fe');
    const o17 = await Object.findById('6443c652e5199c6a72b7a6d6');
    const o18 = await Object.findById('6443ce5f2ef586e29a6e7280');
    const o19 = await Object.findById('6443b942c5139bdf056ae342');
    const o20 = await Object.findById('6443b942c5139bdf056ae347');
    const o21 = await Object.findById('6443b942c5139bdf056ae335');
    const o22 = await Object.findById('6443b942c5139bdf056ae345');
    const o23 = await Object.findById('6443b942c5139bdf056ae340');
    const o24 = await Object.findById('6443b942c5139bdf056ae349');
    const o25 = await Object.findById('6443e561839f5015688618de');
    const o26 = await Object.findById('6443e561839f5015688618e4');
    const o27 = await Object.findById('6443e561839f5015688618e2');
    const o28 = await Object.findById('6443e561839f5015688618e8');
    const o29 = await Object.findById('6443e561839f5015688618f0');
    const o30 = await Object.findById('6443e561839f5015688618ee');
    homed.sanitary.push(o13);
    homed.sanitary.push(o14);
    homed.sanitary.push(o15);
    homed.sanitary.push(o16);
    homed.sanitary.push(o17);
    homed.sanitary.push(o18);
    homed.artifacts.push(o19);
    homed.artifacts.push(o20);
    homed.artifacts.push(o21);
    homed.artifacts.push(o22);
    homed.artifacts.push(o23);
    homed.artifacts.push(o24);
    homed.paints.push(o25);
    homed.paints.push(o26);
    homed.paints.push(o27);
    homed.paints.push(o28);
    homed.paints.push(o29);
    homed.paints.push(o30);
    await homed.save();
}
// seedhelper();