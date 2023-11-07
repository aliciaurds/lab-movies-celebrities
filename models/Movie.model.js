//*Iteration 5
const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String, 
    plot: String, 
    //below I need to reference to my celebmodel by its ref
    cast: [{
        type: mongoose.Schema.Types.ObjectId, //?This line says that each element in the "cast" array will be of type ObjectId.
        ref: "Celeb" //?and this line indicates that each element in the cast array it's refered to the object "Celeb" which has been created before. It's my target model.
    }]

})

const Movie = mongoose.model("Movie", movieSchema) //=> call mongoose object and create a new model named "Movie" with my schema structure
module.exports = Movie