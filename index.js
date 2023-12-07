require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {prisma} = require("./config/prisma");
const {signRoutes} = require("./routes/sign.routes.js");
const {kategoriRoutes} = require("./routes/kategori.routes.js");
const {kamarRoutes} = require("./routes/kamar.routes.js");
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
app.use("/kamar", kamarRoutes)

//create data
app.post("/user", async (req, res) => {
    // const {nama_lengkap,jenis_kelamin,tgl_lahir,pekerjaan,no_telp,email,password} = req.body;
	// if (!nama_lengkap,!jenis_kelamin,!tgl_lahir,!pekerjaan,!no_telp,!email,!password) res.status(400).json({ message: "Sudah terdaftar"});
    const newUser = await prisma.user.create({
        data: {
            nama_lengkap: req.body.nama_lengkap,
            jenis_kelamin: req.body.jenis_kelamin,
            tgl_lahir: req.body.tgl_lahir,
            pekerjaan: req.body.pekerjaan,
            no_telp: req.body.no_telp,
            email: req.body.email,
            password: req.body.password,
        },
    });
    res.status(201).json({
        message: "Data sudah ditambahkan",
        data: newUser,
    });
});

 app.get("/kost", async (req, res) =>{
    const kost = await prisma.kost.findMany();
    res.status(200).send(kost);
 });

 app.get("/user", async (req, res) =>{
    const user = await prisma.user.findMany();
    res.status(200).send(user);
 });

 app.get("/booking", async (req, res) =>{
    const booking = await prisma.booking.findMany();
    res.status(200).send(booking);
 });

app.all("*", async (req, res) => {
    res.json({
        message: "Router tidak ditemukan",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sarver sudah berjalan di ${PORT}`)}) 
