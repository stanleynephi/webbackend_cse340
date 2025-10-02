//routes to handle inventory related requests
const express = require("express")
const router = new express.Router()
const controller = require("../controllers/inventoryController")
const Utils = require("../utilities/index")

//http router verbs
router.get(
  "/type/:classificationId",
  Utils.handleErrors(controller.buildbyClassificationId)
)
router.get(
  "/detail/:inv_id",
  Utils.handleErrors(controller.buildInventoryItemDetail)
)

//export router
module.exports = router

//export router
module.exports = router
