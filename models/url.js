const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortedUrl:{
        type: String,
        unique: true,
        required: true
    },
    requiredUrl:{
        type: String,
        required: true
    },
    visitedHistory:[{timestamp:{type:Number}}],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
    },
},{timestamps:true})

const URL = mongoose.model("url",urlSchema);
module.exports = URL;