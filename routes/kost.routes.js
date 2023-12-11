const express = require("express")
const kostRoutes = express.Router()
const { prisma } = require("../config/prisma")

//Menginput data kost
kostRoutes.post("/", async (req, res) => {
  const newKos = await prisma.kost.create({
    data: {
      imgUrl: req.body.imgUrl,
      nama_kos: req.body.nama_kos,
      harga_range: req.body.harga_range,
      alamat_kos: req.body.alamat_kos,
    },
  })
  res.status(200).json({
    message: "Data telah ditambahkan",
    data: newKos,
  })
})

//get data kamar
kostRoutes.get("/", async (req, res) => {
  const kost = await prisma.kost.findMany()
  res.status(200).send(kost)
})

//mengambil kamar dengan id
kostRoutes.get("/:id", async (req, res) => {
  const kost = await prisma.kost.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  })
  if (!kost) res.status(404).send("Kos tidak ditemukan")
  else res.status(200).send(kost)
})

//mengambil kost berdasarkan id_kategori
// kostRoutes.get("/kategori/:id_kategori", async (req, res) => {
//   const { id_kategori } = req.params
//   const kost = await prisma.kost.findMany({
//     where: {
//       id_kategori: parseInt(id_kategori),
//     },
//   })
//   res.status(200).send(kost)
// })

module.exports = { kostRoutes }
