/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expresslayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
const inventoryRoutes = require("./routes/inventoryRoute")
const Utils = require("./utilities/index")

/**ejs template engine setup */
app.set("view engine", "ejs")
app.use(expresslayouts)
app.set("layout", "./layout/layouts")

/* ***********************
 * Routes
 *************************/
app.use(static)

//set the route to render the home built dynamically and also to control the routes to the needed place
app.get("/", Utils.handleErrors(baseController.buildhome))
app.use("/inv", inventoryRoutes)

app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})

/**middleware for error handling */
app.use(async (err, req, res, next) => {
  let nav = await Utils.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if (err.status == 404) {
    message = err.message
  } else {
    message = "Oh no! There was a crash. Maybe try a different route?"
  }
  res.render("errors/error", {
    title: err.status || "Server Error",
    message: err.message,
    nav,
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
