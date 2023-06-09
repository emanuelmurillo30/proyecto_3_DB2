const {Schema, model} = require('mongoose');

const transaccionesSchema= new Schema({
    tipo:   {type: String},
    numero_cuenta: {type: String},
    numero_cuenta_receptor: {type: String},
    codigo: {type: String},
    fecha: {type: String},
    monto: {type: Number}
})

transacciones = model('transacciones', transaccionesSchema, 'transacciones');

module.exports = transacciones;