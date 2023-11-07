//  Add your code here

//*Iteration 2
const mongoose = require("mongoose")

const celebSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
})

const Celeb = mongoose.model("Celeb", celebSchema) //=> call mongoose object and create a new model named "Celeb" with my schema structure
module.exports = Celeb