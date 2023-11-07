const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//*Iteration 1
const celebritiesRouter = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRouter)

const moviesRouter = require("./movies.routes.js")
router.use("/movies", moviesRouter)

module.exports = router;
