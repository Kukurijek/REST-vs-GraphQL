const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");


let userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    favoriteGenre: String,
    userDescription: String,
    phoneNumber: Number,




})

var Users = mongoose.model('User', userSchema);
module.exports = {
    Users,
    userSchema
};