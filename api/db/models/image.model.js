const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    numberOfLikes: {
        type: Number,
        required: false
    }
})

const Image = mongoose.model('Image', ImageSchema);

module.exports= { Image }