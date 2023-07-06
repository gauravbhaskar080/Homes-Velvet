const mongoose = require('mongoose');
const Delivery = require('./delivery');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: String,
    pnum: String,
    address: String,
    pincode: Number,
    photo: String,
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    bought: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    notdelivered: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})
module.exports = mongoose.model('Customer',CustomerSchema);