const express = require("express")
const signRoutes = express.Router()
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const { prisma } = require("../config/prisma")

//Menginput data Sign
signRoutes.post("/", async (req, res) => {
  const { nama_lengkap, email, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 13)

    const createSign = await prisma.sign.create({
      data: {
        nama_lengkap: nama_lengkap,
        email: email,
        password: hashedPassword,
      },
    })
    res.status(200).json({
      message: "Data telah disimpan",
      data: createSign,
    })
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data." })
  }
})

//Mengambil data sign
signRoutes.get("/", async (req, res) => {
  const sign = await prisma.sign.findMany()
  res.status(200).json(sign)
})

//Mengembil data booking by Id
signRoutes.get("/:id", async (req, res) => {
  const sign = await prisma.sign.findMany({
    where: {
      id: parseInt(req.params.id),
    },
  })
  if (!sign) res.status(404).send("User tidak ditemukan")
  else res.status(200).send(sign)
})

// Route log in
signRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  try {
    const sign = await prisma.sign.findMany({
      where: {
        email: email,
      },
    })

    if (!sign.length) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const match = await bcrypt.compare(password, sign[0].password)

    if (match) {
      req.session.loggedIn = true
      return res.status(200).json({
        status: "success",
        message: "Login successful!",
        user: { email: sign[0].email, password: sign[0].password },
      })
    } else {
      return res.status(401).json({ error: "Invalid email or password" })
    }
  } catch (error) {
    console.error("Error during login", error)
    res.status(500).json({ error: "Error during login" })
  }
})

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
