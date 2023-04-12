const accionesCtrl = [];
const bancoModel = require("../models/bancos");
const personaModel = require("../models/personas");
const cuentaModel = require("../models/cuentas");
const transaccionesModel = require("../models/transacciones");
const uniqid = require('uniqid')
let time = new Date(new Date().toLocaleString("en-US", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
}));


accionesCtrl.index = async(req, res) => {
    res.send("HOLA MUNDO");
}

accionesCtrl.crearPersona = async(req, res) => {
    for(const persona of req.body.personas){
        let cuentaMD = cuentaModel({
            numero_cuenta: uniqid(),
            numero_documento: persona.numero_documento,
            fecha_apertura: time,
            saldo: 1000
        })
        let personaMD = personaModel({
            nombre: persona.nombre,
            apellido: persona.apellido,
            numero_documento: persona.numero_documento
        })
        personaMD.save();
        cuentaMD.save();
    }
    res.send(req.body)
}

module.exports = accionesCtrl;