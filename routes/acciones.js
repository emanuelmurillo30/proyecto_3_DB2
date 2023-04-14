const {Router} = require('express');
const ctrlAcciones = require('../controllers/acciones.controllers');
const router = Router();

router.route('/index')
            .get(ctrlAcciones.index)


router.route('/crear_persona')
            .post(ctrlAcciones.crearPersona)
            
router.route('/transacciones')
            .post(ctrlAcciones.transacciones)
            
router.route('/transferencia')
            .get(ctrlAcciones.obtenerTransacciones)

module.exports = router;