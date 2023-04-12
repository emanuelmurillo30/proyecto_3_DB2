const {Schema, model} = require('mongoose');

const bancosSchema= new Schema({
    personas: [],
    cuentas: [],
    transaccion: []
})

bancos = model('bancos', bancosSchema, 'bancos');