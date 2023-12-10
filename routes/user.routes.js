const express = require("express")
const userRoutes = express.Router()
const { prisma } = require("../config/prisma")

//create data user
userRoutes.post("/", async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      nama_lengkap: req.body.nama_lengkap,
      email: req.body.email,
      password: req.body.password,
      jenis_kelamin: req.body.jenis_kelamin,
      tgl_lahir: req.body.tgl_lahir,
      pekerjaan: req.body.pekerjaan,
      no_telp: req.body.no_telp,
    },
  })
  res.status(201).json({
    message: "Data sudah ditambahkan",
    data: newUser,
  })
})

//Mengembil data user
userRoutes.get("/", async (req, res) => {
  const user = await prisma.user.findMany()
  res.status(200).send(user)
})

// update user
userRoutes.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nama_lengkap } = req.body
  const { email } = req.body
  const { password } = req.body
  const { jenis_kelamin } = req.body
  const { tgl_lahir } = req.body
  const { pekerjaan } = req.body
  const { no_telp } = req.body

  const updateUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      nama_lengkap: nama_lengkap,
      email: email,
      password: password,
      jenis_kelamin: jenis_kelamin,
      tgl_lahir: tgl_lahir,
      pekerjaan: pekerjaan,
      no_telp: no_telp,
    },
  })
  res.status(201).json({
    message: `User dengan id: ${id} berhasil di update`,
    data: updateUser,
  })
})

//delete user
userRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params
  await prisma.user.delete({
    where: { id: parseInt(id) },
  })
  res.status(200).json({
    message: `User dengan id ${id} berhasil dihapus`,
  })
})

module.exports = { userRoutes }
