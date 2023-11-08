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
//BONUSES details, delete, edit

//GET "celebrities/:id" => show specific celebrity
router.get("/:id", async (req, res, next)=>{
    try{
        const response = await Celeb.findById(req.params.id)
        console.log(response);
        res.render("celebrities/celebrity-details.hbs", {
            oneCeleb : response
        })

    } catch(err){
        next(err)
    }
})
//POST "/celebrities/:id/delete" => delete one celeb
router.post("/:id/delete", (req, res, next)=>{
    Celeb.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        next(err)
    })
})
//GET "/celebrities/:id/edit" => show a form to edit a celeb
router.get("/:id/edit", async (req, res, next)=>{
    try{
        const celebToEdit = await Celeb.findById(req.params.id)
        
        res.render("celebrities/edit-celebrity.hbs", {
            celebToEdit            
        })

    } catch(err){
        next(err)
    }
})
//POST "/celebrities/:id/edit" => Send data from form to rout to update the specific celeb
router.post("/:id/edit", async (req, res, next)=>{   
    try{
        const response = await Celeb.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        })
        res.redirect(`/celebrities/${req.params.id}/`)

    } catch(err){
        next(err)
    }
   
})


module.exports = router;