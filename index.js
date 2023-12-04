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

 app.get("/kamar", async (req, res) =>{
    const kamar = await prisma.kamar.findMany();
    res.status(200).send(kamar);
 });

app.all("*", async (req, res) => {
    res.json({
        message: "Router tidak ditemukan",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sarver sudah berjalan di ${PORT}`)}) 