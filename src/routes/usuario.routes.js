import { Router } from "express";
import { prisma } from '../db.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                billeteras: true,
            }
        });
        res.status(201).json(usuarios);
    } catch (error) {
        res.status(500).json( {msg: error.message} )
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: id
            },
            include: {
                billeteras: true,
            }
        });
        if (!usuario) {
            return res.status(404).json({ "msg": "usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json( {msg: error.message} )
    }
});

router.post('/', async (req, res) => {
    try {
        // console.log( req.body )
        if (req.body.idBilletera) {
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    contraseña: req.body.contraseña,
                    billeteras: {
                        connectOrCreate: {
                            where: {
                                id: req.body.idBilletera,
                            },
                            create: {
                                nombre_billetera: req.body.nombreBilletera,
                                id: req.body.idBilletera,
                            },
                        },
                    },
                }
            });
            res.json(nuevoUsuario);
        } else {
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    contraseña: req.body.contraseña,
                }
            });
            res.json(nuevoUsuario);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

//EJEMPLO DE PRISMA.IO
// const createPostAndCategory = await prisma.post.create({
//     data: {
//       title: 'How to become a butterfly',
//       categories: {
//         create: [{ name: 'Magic' }, { name: 'Butterflies' }],
//       },
//     },
//   })
//====================+7

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioEliminado = await prisma.usuario.delete({
            where: {
                id: id
            }
        });
        if (!usuarioEliminado) {
            return res.status(404).json({ "msg": "usuario no encontrado" });
        }
        res.status(200).json( {msg: "usuario eliminado correctamente", "usuario eliminado": usuarioEliminado} );
    } catch (error) {
        res.status(500).json( {msg: error.message} )
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioActualizado = await prisma.usuario.update({
            where: {
                id: id,
            },
            data: req.body
        });
        if (!usuarioActualizado) {
            return res.status(404).json({ "msg": "usuario no encontrado" });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json( {msg: error.message} )
    }
});

//método put que permite asignar una billetera previamente creada a un usuario
router.put('/asignar-billetera/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioConBilletera = await prisma.usuario.update({
            where: {
                id: id,
            },
            data: {
                billeteras: {
                    connectOrCreate: {
                        where: {
                            id: req.body.idBilletera,
                        },
                        create: {
                            nombre_billetera: req.body.nombreBilletera,
                            id: req.body.idBilletera,
                        },
                    },
                }
            }
        });
        res.status(200).json(usuarioConBilletera);
    } catch (error) {
        res.status(500).json({ ms: error.message });
    }
});

export default router;