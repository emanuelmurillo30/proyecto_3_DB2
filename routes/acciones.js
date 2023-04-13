const {Router} = require('express');
const ctrlAcciones = require('../controllers/acciones.controllers');
const router = Router();

router.route('/index')
            .get(ctrlAcciones.index)


router.route('/crear_persona')
            .post(ctrlAcciones.crearPersona)
            
router.route('/deposito')
            .post(ctrlAcciones.deposito)

router.route('/retiro')
            .post(ctrlAcciones.retiro)
            
router.route('/transferencia')
            .post(ctrlAcciones.transferencia)

router.route('/transacciones')
            .post(ctrlAcciones.transacciones)

module.exports = router;