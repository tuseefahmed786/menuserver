const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;
