const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema


const Atividade = new Schema({
    
    nomeProfessor: {
        type: String,
        required: true
    },

    dataAtividade:{
        type: Date,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    paginaInicial: {
        type: Number,
        required: true
    },

    paginaFinal: {
        type: Number,
        required: true
    },
    
    
    idMateria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
        require: true
    },
    materia: {
        type: String,
        required: false
    },

    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        require: true
    },
    nomeUsuario: {
        type: String,
        require: false
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

Atividade.plugin(mongoosePaginate)

mongoose.model('atividade', Atividade)
