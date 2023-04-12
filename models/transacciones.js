const {Schema, model} = require('mongoose');

const transaccionesSchema= new Schema({
    codigo: {type: String},
    fecha: {type: String},
    monto: {type: Number}
})

transacciones = model('transacciones', transaccionesSchema, 'transacciones');

module.exports = transacciones;