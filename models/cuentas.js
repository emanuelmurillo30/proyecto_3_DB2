const {Schema, model} = require('mongoose');

const cuentasSchema= new Schema({
    numero_cuenta: {type: String},
    numero_documento: {type: String},
    fecha_apertura: {type: String},
    saldo: {type: Number}
})

cuentas = model('cuentas', cuentasSchema, 'cuentas');

module.exports = cuentas;