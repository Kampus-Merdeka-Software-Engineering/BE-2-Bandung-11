require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {prisma} = require("./config/prisma")
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.get('/', async (req, res) => {
    res.send("ini adalah response");
});

//get data
 app.get("/kamar", async (req, res) =>{
    const kamar = await prisma.kamar.findMany();
    res.status(200).send(kamar);
 });

 //mengambil kamar dengan id
 app.get("/kamar/:id", async (req, res) =>{
    const kamar = await prisma.kamar.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    });
    if (!kamar) res.status(404).send("Kamar tidak ditemukan");
    else res.status(200).send(kamar);
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

 app.get("/kategori", async (req, res) =>{
    const kategori = await prisma.kategori.findMany();
    res.status(200).send(kategori);
 });

//create data
app.post("/user", async (req, res) => {
    const {nama_lengkap,jenis_kelamin,tgl_lahir,pekerjaan,no_telp,email,password} = req.body;
    // if (!nama_lengkap,!jenis_kelamin,!tgl_lahir,pekerjaan,no_telp,email,password) res.status(400).json({ message: "Sudah terdaftar"});
    const newUser = await prisma.user.create({
        data: {
            // nama_lengkap: nama_lengkap,
            Nama: nama_lengkap,
            Jenis_Kelamin: jenis_kelamin,
            Tanggal_Lahir: tgl_lahir,
            Pekerjaan: pekerjaan,
            No_Telepon: no_telp,
            Email: email,
            Password: password,

            // password : password,
        },
    });
    res.status(201).json({
        message: "Data sudah ditambahkan",
        data: newUser,
    });
});

app.all("*", async (req, res) => {
    res.json({
        message: "Router tidak ditemukan",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sarver sudah berjalan di ${PORT}`)}) 