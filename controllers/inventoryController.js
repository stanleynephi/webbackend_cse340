//inventory controller to recieve data from database and render it to the client
const invModel = require("../model/inventory-model")
const Utils = require("../utilities/index")
const invController = {}

//build the view based of the classificationID
invController.buildbyClassificationId = async function (req, res, next) {
  try {
    const classificationId = req.params.classificationId
    const data = await invModel.getinventorybyClassificationID(classificationId)
    console.log(data.rows)
    const grid = await Utils.buildclassificationGrid(data)
    let nav = await Utils.getNav()
    const className = data.rows[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    console.log(error)
  }
}

/**build the inventory detail page */
invController.buildInventoryItemDetail = async function (req, res, next) {
  /**try catch statement to get the parameter for the search and also the needed model functions */
  try {
    /**get the inv_id paramter given when the request is made */
    const inventory_id = req.params.inv_id
    console.log("Inventory ID received:", inventory_id)
    /**get the inventory item detail based on the inv_id */
    const inventory = await invModel.getinventoryitemDetails(inventory_id)
    console.log(
      "Inventory item detail fetched for ID:",
      inventory_id,
      inventory
    )

    /**get the classname */
    const classificationName =
      inventory.rows[0].inv_make + " " + inventory.rows[0].inv_model
    /**get the navigations created */
    let nav = await Utils.getNav()
    /**get the car details display */
    const carDetails = await Utils.buildcardetailDisplay(inventory)
    console.log("Car details display created:", carDetails)

    /**render response */
    res.render("./inventory/details", {
      title: classificationName,
      nav,
      carDetails,
    })
  } catch (error) {
    console.error("Error fetching inventory item detail:", error)
    res.status(500).send("Internal Server Error")
  }
}

module.exports = invController
