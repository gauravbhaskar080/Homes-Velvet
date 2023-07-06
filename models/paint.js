const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaintSchema = new Schema({
    title: String,
    objects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ]
});

module.exports = mongoose.model('Paint',PaintSchema);