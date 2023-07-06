const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company');
const Delivery = require('./delivery');
const AccountSchema = new Schema({
    paywithdelivery: Number,
    pendingpayments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        }
    ],
    accountbal: Number,
    totalbusiness: Number,
    allcompanies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        }
    ],
    companytotalpaypen: Number,
    npp: Number,
    deliverycod: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Delivery'
        }
    ],
    profit: Number,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('Account',AccountSchema);