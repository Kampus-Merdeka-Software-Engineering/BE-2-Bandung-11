const express = require('express');
const bookingRoutes = express.Router();
const {prisma} = require("../config/prisma");

//create data user
bookingRoutes.post("/", async (req, res) => {
    const newUser = await prisma.booking.create({
        data: {status: req.body.status},
    });
    res.status(201).json({
        message: "Sudah Terverifikasi",
        data: newUser,
    });
});

//Mengembil data user
bookingRoutes.get("/", async (req, res) =>{
    const user = await prisma.booking.findMany();
    res.status(200).send(booking);
});

// update booking
bookingRoutes.put("/:id", async (req, res) => {
    const {id} = req.params;
	const {status} = req.body;
	
    const updateStatus = await prisma.booking.update({
		where : { id: parseInt(id) },
		data  : { status: status},
    });
    res.status(201).json({
        message:`Status telah diubah`,
        data: updateStatus,
    });
});

//delete booking
bookingRoutes.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await prisma.status.delete({
        where: 
        {id: parseInt(id),
        },
    });
    res.status(200).json({
        message: `Data booking telah dihapus`,
    });
});

module.exports = {bookingRoutes};