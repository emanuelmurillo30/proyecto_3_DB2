const {Router} = require('express');
const ctrlAcciones = require('../controllers/acciones.controllers');
const router = Router();

router.route('/index')
            .get(ctrlAcciones.index)

router.route('/crear_persona')
            .post(ctrlAcciones.crearPersona)

module.exports = router;