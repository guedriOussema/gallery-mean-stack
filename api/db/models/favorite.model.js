const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
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
    _imageId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports= { Favorite }