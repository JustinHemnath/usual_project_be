const express = require("express")
const cors = require("cors")

const usersRoute = require("./src/routes/user.route")

const app = express()
const port = 8000

app.use(cors())
app.use("/users", usersRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })