//create the connection pool
const { Pool, Query } = require("pg")
require("dotenv").config()

//establish a connection set the ssl rejectUnauthorize to false.
let pool

if (process.env.NODE_ENVIRONMENT === "development") {
  pool = new Pool({
    connectionString: process.env.database,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  if (!pool) {
    console.log("Connection Terminated")
    return
  }

  //troubleshoot line of code to see if connection works
  module.exports = {
    async query(text, params) {
      try {
        const response = await pool.query(text, params)
        console.log(`Query was successfully executed`, text)
        return response
      } catch (error) {
        throw error
      }
    },
  }
} else {
  pool = new Pool({
    connectionString: process.env.database,
  })

  module.exports = pool
}
