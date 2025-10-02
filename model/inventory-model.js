//connection for the inventory model.
const pool = require("../database/index")

//model query for the database
async function inventoryClassification() {
  try {
    const query = `select * from public.classification order by classification_name`
    const result = await pool.query(query)
    console.log(result.rows)
    return result
  } catch (error) {
    console.log(error)
  }
}

//get item based of the classification id providede
async function getinventorybyClassificationID(classification_id) {
  try {
    const query = `select * from public.inventory as i join public.classification as c
     on i.classification_id = c.classification_id where i.classification_id = $1`

    const values = [classification_id]

    const result = await pool.query(query, values)
    console.log(result.rows)
    return result
  } catch (error) {
    console.log(error)
  }
}

async function getinventoryitemDetails(inv_id) {
  /**sql select query to select everything about a car from the inventory using the car id */
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
                WHERE i.inv_id = $1`,
      [inv_id]
    )
    console.log("Data fetched for inventory ID:", inv_id, data)
    return data // Return the rows of the result
  } catch (error) {
    console.log("Error fetching inventory item details:", error)
    throw error // Re-throw the error to be handled by the calling function
  }
}

module.exports = {
  inventoryClassification,
  getinventorybyClassificationID,
  getinventoryitemDetails,
}
