import { Router } from "express";
import { prisma } from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    const billeteras = await prisma.billetera.findMany();
    res.status(201).json(billeteras)
})

router.get('/:id', async (req, res) => {
    const id = parseInt( req.params.id );
    const billetera = await prisma.billetera.findUnique({
        where: {
            id: id,
        },
        include: {
            movimientos: true,
            usuario: true,
        }
    });
    res.status(200).json(billetera)
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const nuevaBilletera = await prisma.billetera.create({
        data: req.body,
    })
    res.json(nuevaBilletera);
})
export default router;

