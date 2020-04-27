//Carrega Modulos
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ContatoInfo = new Schema({
    titulo: {
        type: String,
        required: true
    },

    subtitulo: {
        type: String,
        required: true
    },

    tituloform: {
        type: String,
        required: true
    },

    titulohratend: {
        type: String,
        required: true
    },

    hratend: {
        type: String,
        required: true
    },

    tituloend: {
        type: String,
        required: true
    },

    logradouro: {
        type: String,
        required: true
    },
    
    bairro: {
        type: String,
        required: true
    },
    
    complemento: {
        type: String,
        required: false
    },
    
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },

    telefone: {
        type: String,
        required: true
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

mongoose.model("contatoinfo", ContatoInfo)