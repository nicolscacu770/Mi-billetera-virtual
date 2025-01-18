import { Router } from "express";
import { prisma } from '../db.js'
const router = Router();

router.get('/', async (req, res) => {
    try {
        const billeteras = await prisma.billetera.findMany();
        res.status(201).json(billeteras);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "bill.getAll"});
    } 
});

router.get('/:id', async (req, res) => {
    try {
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
        res.status(200).json(billetera);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "bill.get"});
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const nuevaBilletera = await prisma.billetera.create({
            data: req.body,
        })
        res.json(nuevaBilletera);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "bill.post"});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt( req.params.id );
        const billeteraActualizada = await prisma.billetera.update({
            where:{
                id: id
            },
            data: req.body
        });
        if( !billeteraActualizada ){
            return res.status(404).json({ msg: "billetera no encontrado" });
        }
        res.status(200).json(billeteraActualizada);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "bill.put"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt( req.params.id );
        const billeteraEliminada = await prisma.billetera.delete({
            where:{
                id: id
            }
        });
        if( !billeteraEliminada ){
            return res.status(404).json({ msg: "billetera no encontrado" });
        }
        res.status(200).json(billeteraEliminada);
    } catch (error) {
        res.status(500).json({msg: error.message, source: "bill.del"});
    }
});

export default router;

