const express = require("express")
const kamarRoutes = express.Router()
const { prisma } = require("../config/prisma")

//Menginput data kamar
kamarRoutes.post("/", async (req, res) => {
  const newKamar = await prisma.kamar.create({
    data: {
      imgUrl: req.body.imgUrl,
      nama_kamar: req.body.nama_kamar,
      harga_kamar: req.body.harga_kamar,
    },
  })
  res.status(200).json({
    message: "Data telah ditambahkan",
    data: newKamar,
  })
})

// get data kamar
kamarRoutes.get("/", async (req, res) => {
  const kamar = await prisma.kamar.findMany()
  res.status(200).send(kamar)
})

//get data kamar by id_kos
kamarRoutes.get("/kost/:id_kos", async (req, res) => {
  const { id_kos } = req.params
  const kamar = await prisma.kamar.findMany({
    where: {
      id_kos: parseInt(id_kos),
    },
  })
  res.status(200).send(kamar)
})

//mengambil kamar dengan id
kamarRoutes.get("/:id", async (req, res) => {
  const kamar = await prisma.kamar.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  })
  if (!kamar) res.status(404).send("Kamar tidak ditemukan")
  else res.status(200).send(kamar)
})

module.exports = { kamarRoutes }
