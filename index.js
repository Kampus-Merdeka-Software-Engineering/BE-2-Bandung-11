require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { signRoutes } = require("./routes/sign.routes.js")
const { userRoutes } = require("./routes/user.routes.js")
const { kamarRoutes } = require("./routes/kamar.routes.js")
const { kostRoutes } = require("./routes/kost.routes.js")
const { bookingRoutes } = require("./routes/booking.routes.js")
const { PrismaClient } = require("@prisma/client")
const app = express()
const session = require("express-session")
const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  res.send("ini adalah response")
})

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: true,
  })
)

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})

//catalog routes
app.use("/sign", signRoutes)
app.use("/user", userRoutes)
app.use("/kamar", kamarRoutes)
app.use("/kost", kostRoutes)
app.use("/booking", bookingRoutes)

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false
  next()
})

app.get("/api/checkLoginStatus", (req, res) => {
  res.json({ loggedIn: req.session.loggedIn || false })
})

app.all("*", async (req, res) => {
  res.json({
    message: "Router tidak ditemukan",
  })
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sarver sudah berjalan di ${PORT}`)
})
