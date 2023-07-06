const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Object = require('./object');
const CompanySchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    companyname: String,
    totalbusines: Number,
    paymentpending: Number,
    paymentcleared: Number,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gstnum: String
});

module.exports = mongoose.model('Company',CompanySchema);