import { Router } from "express";
import { prisma } from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    const movimientos = await prisma.movimiento.findMany();
    res.status(201).json(movimientos)
});

router.get('/:id', async (req, res) => {
    const id = parseInt( req.params.id );
    const movimiento = await prisma.movimiento.findUnique({
        where: {
            id: id,
        },
        include: { //se utiliza para mostrar los datos de la tabla relacionada, en este caso billetera
            billetera: true,
        }
    });
    res.status(200).json(movimiento)
});

router.post('/', async (req, res) => {
    const nuevoMovimiento = await prisma.movimiento.create({
        data: req.body,
    })
    res.json(nuevoMovimiento);
});

router.put('/:id', async (req, res) => {

});
export default router;