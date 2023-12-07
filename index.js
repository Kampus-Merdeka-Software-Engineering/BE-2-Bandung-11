require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {signRoutes} = require("./routes/sign.routes.js");
const {userRoutes} = require("./routes/user.routes.js");
const {kategoriRoutes} = require("./routes/kategori.routes.js");
const {kamarRoutes} = require("./routes/kamar.routes.js");
const {kostRoutes} = require("./routes/kost.routes.js");
const {bookingRoutes} = require("./routes/booking.routes.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.get('/', async (req, res) => {
    res.send("ini adalah response");
});

//catalog routes
app.use("/kategori", kategoriRoutes)
app.use("/sign", signRoutes)
app.use("/user", userRoutes)
app.use("/kamar", kamarRoutes)
app.use("/kost", kostRoutes)
app.use("/booking", bookingRoutes)

app.all("*", async (req, res) => {
    res.json({
        message: "Router tidak ditemukan",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sarver sudah berjalan di ${PORT}`)}) 
