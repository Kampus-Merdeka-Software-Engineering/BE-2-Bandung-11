const express = require('express');
const bookingRoutes = express.Router();
const {prisma} = require("../config/prisma");

//create data booking
bookingRoutes.post("/", async (req, res) => {
    const newStatus = await prisma.booking.create({
        data: {status: req.body.status},
    });
    res.status(201).json({
        message: "Sudah Terverifikasi",
        data: newStatus,
    });
});

//Mengembil data booking
bookingRoutes.get("/", async (req, res) =>{
    const booking = await prisma.booking.findMany();
    res.status(200).send(booking);
});
//Mengembil data booking by Id
bookingRoutes.get("/:id", async (req, res) =>{
    const booking = await prisma.booking.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    });
    if (!booking) res.status(404).send("Kos tidak ditemukan");
    else res.status(200).send(booking);
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
    await prisma.booking.delete({
        where: 
        {id: parseInt(id),
        },
    });
    res.status(200).json({
        message: `Data booking telah dihapus`,
    });
});

module.exports = {bookingRoutes};