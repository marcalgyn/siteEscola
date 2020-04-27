//Carrega Modulos

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Rodape = new Schema({
    titulopg: {
        type: String,
        required: true
    },
    
    titulopgum: {
        type: String,
        required: true
    },
    
    urlpgum: {
        type: String,
        required: true
    },
    
    titulopgdois: {
        type: String,
        required: true
    },
    
    urlpgdois: {
        type: String,
        required: true
    },
    
    titulopgtreis: {
        type: String,
        required: true
    },

    urlpgtreis: {
        type: String,
        required: true
    },

    tituloend:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    
    endereco:{
        type: String,
        required: true
    },
    
    cnpj:{
        type: String,
        required: true
    },
    
    tituloredsoc: {
        type: String,
        required: true
    },

    titulorsum: {
        type: String,
        required: true
    },
    urlrdum:{
        type: String,
        required: true
    },

    titulorsdois: {
        type: String,
        required: true
    },
    urlrddois:{
        type: String,
        required: true
    },

    titulorstreis: {
        type: String,
        required: false
    },
    urlrdtreis:{
        type: String,
        required: false
    },
    titulorsquatro: {
        type: String,
        required: false
    },
    urlrdquatro:{
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updateAt: {
        type: Date,
        required: false
    }

})

mongoose.model("rodape", Rodape)
