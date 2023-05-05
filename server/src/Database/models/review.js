const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")
const Movie = require("./movie")

let reviewSchema = new Schema({
    title: String,
    description: String,
    body: String,
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

var Reviews = mongoose.model('Review', reviewSchema);
module.exports = {
    Reviews,
    reviewSchema
};