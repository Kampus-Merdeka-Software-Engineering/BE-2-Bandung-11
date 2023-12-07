const express = require('express');
const signRoutes = express.Router();
const {prisma} = require("../config/prisma");

//Menginput data Sign
signRoutes.post("/", async (req, res) => {
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

//delete sign
signRoutes.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await prisma.sign.delete({
        where: 
        {id: parseInt(id),
        },
    });
    res.status(200).json({
        message: `Data dengan id ${id} berhasil dihapus`,
    });
});

module.exports = {signRoutes};