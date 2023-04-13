const accionesCtrl = [];
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
    res.send("Hola Mundo!")
}

accionesCtrl.crearPersona = async(req, res) => {
    for(const persona of req.body){
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

accionesCtrl.deposito = async(req, res) => {
    for(const deposito of req.body.depositos){

    }
}

accionesCtrl.retiro = async(req, res) => {

}

accionesCtrl.transferencia = async(req, res) => {

}

accionesCtrl.transacciones = async(req, res) => {
    let consultas = [], consultasReceptor = [];
    for(const transaccion of req.body.transacciones){
        /////////////PARA TIPO DEPOSITO//////////////
        if(transaccion.tipo == "deposito"){
            let transaccionAux = transaccionesModel({
                tipo: transaccion.tipo,
                numero_cuenta: transaccion.numero_cuenta,
                numero_cuenta_receptor: 'null',
                codigo: uniqid(),
                fecha: time,
                monto: transaccion.monto
            })
            await transaccionAux.save()
            let cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            let persona = await personaModel.findOne({numero_documento: cuenta.numero_documento})
            await cuentaModel.findOneAndUpdate({numero_cuenta: transaccion.numero_cuenta}, 
                {
                    $set:{
                        saldo: transaccion.monto + cuenta.saldo
                    }
                }
            )
            cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            consultas.push([
                {
                    "propietario": persona.nombre,
                    "numero_cuenta": cuenta.numero_cuenta,
                    "monto_agregado": transaccion.monto,
                    "saldo_actual": cuenta.saldo
                }
            ]);
        }
        ////////////////////////////////RETIROS///////////////////////////////
        if(transaccion.tipo == "retiro"){
            let transaccionAux = transaccionesModel({
                tipo: transaccion.tipo,
                numero_cuenta: transaccion.numero_cuenta,
                numero_cuenta_receptor: 'null',
                codigo: uniqid(),
                fecha: time,
                monto: transaccion.monto
            })
            await transaccionAux.save()
            let cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            let persona = await personaModel.findOne({numero_documento: cuenta.numero_documento})
            await cuentaModel.findOneAndUpdate({numero_cuenta: transaccion.numero_cuenta}, 
                {
                    $set:{
                        saldo: cuenta.saldo - transaccion.monto
                    }
                }
            )
            cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            consultas.push([
                {
                    "propietario": persona.nombre,
                    "numero_cuenta": cuenta.numero_cuenta,
                    "monto_reducido": transaccion.monto,
                    "saldo_actual": cuenta.saldo
                }
            ]);
        }
        //////////////////////////////////////TRANSACCION////////////////////////////////////////
        if(transaccion.tipo == "transferencia"){
            let transaccionAux = transaccionesModel({
                tipo: transaccion.tipo,
                numero_cuenta: transaccion.numero_cuenta,
                numero_cuenta_receptor: transaccion.numero_cuenta_receptor,
                codigo: uniqid(),
                fecha: time,
                monto: transaccion.monto
            })
            await transaccionAux.save()
            let cuentaReceptor = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta_receptor})
            let cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            let personaReceptor = await personaModel.findOne({numero_documento: cuentaReceptor.numero_documento})
            let persona = await personaModel.findOne({numero_documento: cuenta.numero_documento})
            await cuentaModel.findOneAndUpdate({numero_cuenta: transaccion.numero_cuenta_receptor}, 
                {
                    $set:{
                        saldo: transaccion.monto + cuentaReceptor.saldo
                    }
                }
            )
            await cuentaModel.findOneAndUpdate({numero_cuenta: transaccion.numero_cuenta}, 
                {
                    $set:{
                        saldo: cuenta.saldo - transaccion.monto
                    }
                }
            )
            cuenta = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta})
            cuentaReceptor = await cuentaModel.findOne({numero_cuenta: transaccion.numero_cuenta_receptor})

            consultasReceptor.push([
                {
                    "propietario": personaReceptor.nombre,
                    "numero_cuenta": cuentaReceptor.numero_cuenta,
                    "monto_enviado": transaccion.monto,
                    "saldo_actual": cuentaReceptor.saldo
                }
            ]);
            consultas.push([
                {
                    "propietario": persona.nombre,
                    "numero_cuenta": cuenta.numero_cuenta,
                    "monto_recibido": transaccion.monto,
                    "saldo_actual": cuenta.saldo
                }
            ]);
        }
    }
    let respuesta = {};
    respuesta.consultas = consultas;
    respuesta.consultasReceptor = consultasReceptor;
    res.send(respuesta)
    
}

module.exports = accionesCtrl;