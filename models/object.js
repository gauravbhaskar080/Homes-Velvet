const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
    title: String,
    images: [
        {
            type: String
        }
    ],
    price: Number,
    cat: String,
    dispimg: String,
    description: String,
    suplier: String,
    buyers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        }
    ],
    company:{
            type: Schema.Types.ObjectId,
            ref: 'Company'
    },
    rating: Number
});

module.exports = mongoose.model('Object',ObjectSchema);