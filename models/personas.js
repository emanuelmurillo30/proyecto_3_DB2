const {Schema, model} = require('mongoose');

const personasSchema= new Schema({
    nombre: {type: String},
    apellido: {type: String},
    numero_documento: {type:String}
})

personas = model('personas', personasSchema, 'personas');

module.exports = personas;