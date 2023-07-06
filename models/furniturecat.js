const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FurniturecatSchema = new Schema({
    title: String,
    dispimg: String,
    objects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ]
});

module.exports = mongoose.model('Furniturecat',FurniturecatSchema);