/**build the navigations using the data from the database */
const invModel = require("../model/inventory-model")
const Utils = {}

//build the navigations for the application
Utils.getNav = async function (req, res, next) {
  let data = await invModel.inventoryClassification()

  //create a list using html ejs template to contain the data navigations for the application
  let list = "<ul>"
  list += '<li><a href ="/" title= "Home Page">Home</a><li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"

    list += "</li>"
  })

  list += "</ul>"
  return list
}

//build the grid layout for the classification
Utils.buildclassificationGrid = async function (data) {
  let grid

  if (!data || !data.rows || data.rows.length === 0) {
    return "<p>No items found.</p>"
  } else {
    grid = '<ul class="grid-display">'
    data.rows.forEach((vehicle) => {
      grid += "<li>"
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '"title ="View' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += "<h2>"
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>"
      grid += "</h2>"
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>"
      grid += "</div>"
      grid += "</li>"
    })
    grid += "</ul>"
  }

  return grid
}

/**function for structing the detail view for the website.*/
Utils.buildcardetailDisplay = async function (data) {
  let car = data.rows[0]
  let details
  /**conditional statement for validation */
  if (!car) {
    return "<p>No car details found.</p>"
  } else {
    details = `<div class= "car-details">
      <div class="car-image-container">
        <img src="${car.inv_image}" alt="Image of ${car.inv_make} ${
      car.inv_model
    }" />
      </div>
      <div class="car-info">
        <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(
          car.inv_price
        )}</p>
        <p><strong>Description:</strong> ${car.inv_description}</p>
        <p><strong>Color:</strong> ${car.inv_color}</p>
        <p><strong>Year:</strong> ${car.inv_year}</p>
      </div>
    </div>
    `
  }

  return details
}

Utils.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Utils
