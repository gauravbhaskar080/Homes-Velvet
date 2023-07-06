const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Object = require('./object');

const DesignSchema = new Schema({
    dispimg: [{ 
        type: String
    }],
    title: String
});

module.exports = mongoose.model('Design',DesignSchema);