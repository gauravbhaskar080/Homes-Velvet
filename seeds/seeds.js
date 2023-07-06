const mongoose = require('mongoose');
const Furniturecat = require('./models/furniturecat');
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
const seedshelper= async function(title,dispimg){
    const newsofa = new Furniturecat();
    newsofa.title = title;
    newsofa.dispimg = dispimg;
    await newsofa.save();
}
// seedshelper('Sofa','https://cb2.scene7.com/is/image/CB2/CurvoSnowSofaJN21_1x1/$web_pdp_main_carousel_md$/230302033007/CurvoSnowSofaJN21_1x1.jpg');
// seedshelper('Beds','https://cb2.scene7.com/is/image/CB2/ParkerStorageKingBedSHF20_1x1/$web_pdp_main_carousel_md$/200813113042/parker-storage-king-bed.jpg');
// seedshelper('Tables','https://cb2.scene7.com/is/image/CB2/AquaVirgoSmallDarkBrownAG21_1x1/$web_pdp_main_carousel_md$/230302033250/AquaVirgoSmallDarkBrownAG21_1x1.jpg');
// seedshelper('Chairs','https://cb2.scene7.com/is/image/CB2/FoleyVlvtMinkDnngChairSHF20_1x1/$web_pdp_main_carousel_md$/210518111049/foley-mink-velvet-dining-chair.jpg');
// seedshelper('Almirah','https://www.ulcdn.net/images/products/314046/slide/666x363/Baltoro_Wardrobe_White_1.jpg?1612598408');
// seedshelper('Dinning Tables','https://cb2.scene7.com/is/image/CB2/CrowleyTpdLegDiningTableSHS23/$web_pdp_main_carousel_md$/221201151022/crowley-black-wood-dining-table.jpg');
// seedshelper('Cabinets','https://cb2.scene7.com/is/image/CB2/RossoOxBldEntrywayCbntSHS22/$web_pdp_main_carousel_md$/211028102232/rosso-oxblood-entryway-cabinet.jpg');
// seedshelper('Shoe Storage','https://www.ulcdn.net/images/products/683779/slide/666x363/FVSGSR61BK23708_1.jpg?1665041636');

// const addimage = async function(){
//     const sofa = await  Object.findById('640efc6d7c7bee1c285c2837');
//     // sofa.images.push('https://cb2.scene7.com/is/image/CB2/CurvoNomadSnowSofa3QBF20/$web_pdp_main_carousel_md$/230302033022/CurvoNomadSnowSofa3QBF20.jpg')
//     sofa.images.push('https://cb2.scene7.com/is/image/CB2/CurvoNomadSnowSofaSDF20/$web_pdp_main_carousel_md$/230302033022/CurvoNomadSnowSofaSDF20.jpg')
//     sofa.images.push('https://cb2.scene7.com/is/image/CB2/CurvoSnowSofaOC20_1x1/$web_pdp_main_carousel_md$/230302033022/CurvoSnowSofaOC20_1x1.jpg')
//     sofa.images.push('https://cb2.scene7.com/is/image/CB2/CurvoNomadSnowSofaAVSHF20_1x1/$web_pdp_main_carousel_md$/230302033022/CurvoNomadSnowSofaAVSHF20_1x1.jpg')
//     sofa.images.push('https://cb2.scene7.com/is/image/CB2/CurvoNomadSnowSofaSHF20_1x1/$web_pdp_main_carousel_md$/211123114834/curvo-snow-sofa.jpg')
//     await sofa.save();
// }
// addimage();

const seedhelper = async function(){
    const o = await Object.findById('6443b942c5139bdf056ae35d');
    // o.dispimg = 'https://cb2.scene7.com/is/image/CB2/SEYSLaurentStdBk33x39p5SF22_3D/$web_pdp_main_carousel_md$/220608090028/yves-saint-laurents-studio-art-print.jpg';
    o.title = "New Artifact";
    await o.save();
}
seedhelper();