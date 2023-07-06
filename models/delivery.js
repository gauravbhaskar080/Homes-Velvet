const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeliverySchema = new Schema({
    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Object'
    }],
    quantity: Number,
    deliveryaddress: String,
    status: String,
    payment: Number,
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    productid: String
});

module.exports = mongoose.model('Delivery',DeliverySchema);