const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HomedesignSchema = new Schema({
    tiles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    furniture: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    sanitary: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    artifacts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
    paints: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ],
});

module.exports = mongoose.model('Homedesign',HomedesignSchema);