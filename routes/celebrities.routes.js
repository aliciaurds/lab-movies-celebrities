//*Iteration 1
const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");


// all your routes here

//GET "/celebrities/create" => show a form to create celebrity

//*Iteration 3-Create form
router.get("/create", (req, res, next) =>{    
    res.render("celebrities/new-celebrity.hbs")
   })

//POST "/celebrities/create" => Send the data from the form to this route to create the celebrity and save it to the db
router.post("/create", (req, res, next)=>{
    console.log(req.body);
    //creamos la celeb con la info obtenida del req.body
    Celeb.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch((err) =>{
        next(err)
    })
})

//*Iteration 4 -Listing
//GET "/celebrities" => Show all Celebrities
router.get("/", async (req, res, next)=>{
    try{
        const response = await Celeb.find().select({name:1}) //=>buena práctica no necesitamos imprimir toda la info
        console.log(response); //comprobamos info recibida
        res.render("celebrities/celebrities.hbs", {
            allCelebs : response,
        })
    } catch(err){
        next(err)
    }
})

module.exports = router;