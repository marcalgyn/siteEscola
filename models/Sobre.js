//Carrega Modulos
const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Sobre = new Schema({
    
    titulotop: {
        type: String,
        required: true
    },
    subtitulotop: {
        type: String,
        required: true
    },

    titulo: {
        type: String,
        required: true
    },
    subtitulo: {
        type: String,
        required: true
    },
    
    iconesbum: {
        type: String,
        required: true
    },

    titulosbum: {
        type: String,
        required: true
    },

    descsbum: {
        type: String,
        required: true
    },

    iconesbdois: {
        type: String,
        required: true
    },

    titulosbdois: {
        type: String,
        required: true
    },

    descsbdois: {
        type: String,
        required: true
    },
    
    iconesbtreis: {
        type: String,
        required: true
    },

    titulosbtreis: {
        type: String,
        required: true
    },

    descsbtreis: {
        type: String,
        required: true
    },

    titulobtn: {
        type: String,
        required: true
    },

    urlbtn: {
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

mongoose.model('sobre', Sobre)