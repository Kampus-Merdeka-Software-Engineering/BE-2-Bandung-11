const express = require("express")
const signRoutes = express.Router()
const { prisma } = require("../config/prisma")

//Menginput data Sign
signRoutes.post("/", async (req, res) => {
  const newSign = await prisma.sign.create({
    data: {
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      password: req.body.password,
    },
  })
  res.status(200).json({
    message: "Akun telah terdaftar",
    data: newSign,
  })
})

// // login
// signRoutes.post("/login", async (req, res) => {
//   const { email, password } = req.body

//   // Cari sign dengan email tersebut
//   const signUser = await prisma.sign.findMany({
//     where: {
//       email: email,
//     },
//   })

//   // Bandingkan password yang masuk dari req.body dengan password yang ada di database
//   if (signUser && signUser.password === password) {
//     // Kalau misal passwordnya sama -> yang login bener (accepted)
//     res.status(200).send("Login berhasil!")
//   } else {
//     // Kalau misal login salah password
//     res.status(401).send("Email atau password salah!")
//   }
// })

//delete sign
signRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params
  await prisma.sign.delete({
    where: { id: parseInt(id) },
  })
  res.status(200).json({
    message: `Data dengan id ${id} berhasil dihapus`,
  })
})

module.exports = { signRoutes }
