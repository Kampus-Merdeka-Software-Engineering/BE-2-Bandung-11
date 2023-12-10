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

//Mengambil data sign
signRoutes.get("/", async (req, res) => {
  const sign = await prisma.sign.findMany()
  res.status(200).json(sign)
})

//Mengembil data booking by Id
signRoutes.get("/:id", async (req, res) => {
  const sign = await prisma.sign.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  })
  if (!sign) res.status(404).send("User tidak ditemukan")
  else res.status(200).send(sign)
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

// update Sign
signRoutes.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nama_lengkap } = req.body
  const { email } = req.body
  const { password } = req.body

  const updateSign = await prisma.sign.update({
    where: { id: parseInt(id) },
    data: {
      nama_lengkap: nama_lengkap,
      email: email,
      password: password,
    },
  })
  res.status(201).json({
    message: `User dengan id: ${id} berhasil di update`,
    data: updateSign,
  })
})

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
