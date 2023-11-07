//*Iteration 1 - express and router require.  module.export
const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//*Iteration 6
// all your routes here

//GET "/movies/create" => show a form to create a movie
router.get("/create", async (req, res, next)=>{
    try{        
        const response = await Celeb.find().select({name:1}) //query the Celeb model to show the list of celebrities and "find" all data in this collection. Select for good use.
        console.log(response);
        res.render("movies/new-movie.hbs", {
            allCelebs : response // list of the celebs retrieved from db
        })

    } catch(err){
        next(err)
    }
})

//POST "/movies/create" => send the data from the form to the route to create the movie and save it to the db
router.post("/create", (req, res, next)=>{
    console.log(req.body);
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    })
    .then(()=>{
        res.redirect("/movies")
    })
    .catch(() =>{
        next(err)
    })
})
//*Iteration 7
//GET "/movies" => show all movies
router.get("/", async (req, res, next) =>{
    try {
        const response = await Movie.find().select({title:1})
        console.log(response);
        res.render("movies/movies.hbs", {
            allMovies : response
        })

    } catch(err){
        next(err)
    }
})
//*Iteration 8
//GET "/movies/:id" => show specific movie
router.get("/:id", async (req, res, next)=>{
    try{
        const response = await Movie.findById(req.params.id).populate("cast")
        console.log(req.params.id);
        console.log(response);
        res.render("movies/movie-details.hbs", {
            oneMovie : response
        })
    } catch(err){
        next(err)
    }
})
//*Iteration 9
//POST "/movies/:id/delete" => delete a specific movie
router.post("/:id/delete", (req, res, next)=>{
    Movie.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })
})
//*Iteration 10 (BONUS)
//GET "/movies/:id/edit" => show a form to edit a movie
router.get("/:id/edit", async (req, res, next)=>{
    try{
        const movieToEdit = await Movie.findById(req.params.id).populate("cast")
        const allCelebs = await Celeb.find().select({name:1})
        res.render("movies/edit-movie.hbs", {
            movieToEdit,
            allCelebs
        })

    } catch(err){
        next(err)
    }
})
//POST "/movies/:id/edit" => Send data from form to rout to update the specific movie
router.post("/:id", async (req, res, next)=>{   
    try{
        const response = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast
        })
        res.redirect(`/movies/${req.params.id}`)

    } catch(err){
        next(err)
    }
   
})

module.exports = router;