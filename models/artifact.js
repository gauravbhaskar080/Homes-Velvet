const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArtifactSchema = new Schema({
    title: String,
    objects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Object'
        }
    ]
});

module.exports = mongoose.model('Artifact',ArtifactSchema);