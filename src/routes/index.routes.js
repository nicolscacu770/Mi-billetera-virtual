import { Router } from "express";
import usuarioRoutes from './usuario.routes.js';
import movimientoRoutes from './movimientos.routes.js';
import billeteraRoutes from './billetera.routes.js';

function routerApi(app) {
    const router = Router();
    app.use('/api/', router);
    router.use("/movimientos", movimientoRoutes);
    router.use("/usuarios", usuarioRoutes);
    router.use("/billeteras", billeteraRoutes);
}

export default routerApi;