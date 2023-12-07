const express = require('express');
const kamarRoutes = express.Router();
const {prisma} = require("../config/prisma");

//Menginput data kamar
kamarRoutesRoutes.post("/", async (req, res) => {
    const newSign = await prisma.sign.create({
        data: {
            nama_lengkap: req.body.nama_lengkap,
            email: req.body.email,
            password: req.body.password,
        },
    });
    res.status(200).json({
        message: "Akun telah terdaftar",
        data: newSign,
    });
});

//get data kamar
kamarRoutes.get("/", async (req, res) =>{
    const kamar = await prisma.kamar.findMany();
    res.status(200).send(kamar);
 });

//mengambil kamar dengan id
kamarRoutes.get("/:id", async (req, res) =>{
    const kamar = await prisma.kamar.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    });
    if (!kamar) res.status(404).send("Kamar tidak ditemukan");
    else res.status(200).send(kamar);
 });

module.exports = {kamarRoutes};