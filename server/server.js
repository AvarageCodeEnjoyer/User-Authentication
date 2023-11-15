const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./routes/AuthRoute")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()
const { MONGO_URL, PORT } = process.env

mongoose
  .connect(MONGO_URL)
  .then((x) => console.log(`Connected to MongoDB, database name: ${x.connections[0].name}`))
  .catch((err) => console.error(err))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT")
  res.setHeader("Access-Control-Allow-Headers", "content-Type")
  next()
})

const corsOptions = {
  origin: ["http://localhost:5173"],
  allowHeaders: ["Origin", "X-Requested-With", "content-Type", "Accept"],
  credentials: true,
  methods: ['Get', 'POST'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/", authRoute)

/* app.get('/generate-token', (req, res) => {
  const payload = { user: 'example-user' }
}) */

app.listen(PORT)