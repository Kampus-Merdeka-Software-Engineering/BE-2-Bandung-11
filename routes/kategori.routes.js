const express = require('express');
const kategoriRoutes = express.Router();
const {prisma} = require("../config/prisma");


// post kategori
kategoriRoutes.post("/", async (req, res) => {
    const {kategori_kos} = req.body;
    const newKategori = await prisma.kategori.create({
        data: {
            kategori_kos : kategori_kos,
        },
    });
    res.status(201).json({
        message: "Data sudah ditambahkan",
        data: newKategori,
    });
});

//get kategori
kategoriRoutes.get("/", async (req, res) =>{
    const kategori = await prisma.kategori.findMany();
    res.status(200).send(kategori);
 });

 kategoriRoutes.get("/:id", async (req, res) =>{
    const kategori = await prisma.kategori.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    });
    if (!kategori) res.status(404).send("Kategori tidak ditemukan");
    else res.status(200).send(kategori);
 });

// update kategori
kategoriRoutes.put("/:id", async (req, res) => {
    const {id} = req.params;
	const {kategori_kos} = req.body;
	
    const updatekategorikos = await prisma.kategori.update({
		where : { id: parseInt(id) },
		data  : { kategori_kos: kategori_kos},
    });
    res.status(201).json({
        message:`Kategori dengan id: ${id} berhasil di update`,
        data: updatekategorikos,
    });
});

//delete kategori
kategoriRoutes.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await prisma.kategori.delete({
        where: 
        {id: parseInt(id),
        },
    });
    res.status(200).json({
        message: `kategori dengan id ${id} berhasil dihapus`,
    });
});

module.exports = {kategoriRoutes};