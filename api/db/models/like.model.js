const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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

const Like = mongoose.model('Like', LikeSchema);

module.exports= { Like }