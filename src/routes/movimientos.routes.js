import { Router } from "express";
import { prisma } from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const movimientos = await prisma.movimiento.findMany();
        res.status(201).json(movimientos);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "movs.getAll"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt( req.params.id );
        const movimiento = await prisma.movimiento.findUnique({
            where: {
                id: id,
            },
            include: { //se utiliza para mostrar los datos de la tabla relacionada, en este caso billetera
                billetera: true,
            }
        });
        if (!movimiento) {
            return res.status(404).json({ "msg": "movimiento no encontrado" });
        }
        res.status(200).json(movimiento);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "movs.get"});
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoMovimiento = await prisma.movimiento.create({
            data: req.body,
        })
        res.json(nuevoMovimiento);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "movs.post"});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt( req.params.id );
        const movimientoActualizado = await prisma.movimiento.update({
            where: {
                id: id,
            },
            data: req.body
        });
        if (!movimientoActualizado) {
            return res.status(404).json({ "msg": "movimiento no encontrado" });
        }
        res.status(200).json(movimientoActualizado);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "movs.put"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt( req.params.id );
        const movimientoEliminado = await prisma.movimiento.delete({
            where: {
                id: id,
            }
        });
        if (!movimientoEliminado) {
            return res.status(404).json({ "msg": "movimiento no encontrado" });
        }
        res.status(200).json(movimientoEliminado);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "movs.del"});
    }
});
export default router;