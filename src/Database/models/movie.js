const mongoose = require('mongoose');
const Review = require("./review");

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: "Review"

    }],
}, {
    timestamps: true
});

var Movies = mongoose.model('Movie', movieSchema);
module.exports = {
    Movies,
    movieSchema
};