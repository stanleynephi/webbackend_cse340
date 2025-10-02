//require the functions or methods in the model
const utils = require("../utilities/")
const baseController = {}

//controller functions and instructions
baseController.buildhome = async function (req, res) {
  try {
    const nav = await utils.getNav()
    if (!nav) {
      //console.log and error occured during buildup
      console.log(`There was an error in the build up ${nav}`)
    }
    res.render("index", { title: "Home", nav })
  } catch (error) {
    console.log(error)
  }
}

module.exports = baseController
