const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema



const Listagem = new Schema({
     local: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

    idAtividade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Atividade",
        require: true
    },

    materia: {
        type: String,
        required: false
    },

    nomeProfessor: {
        type: String,
        required: false
    },
    
    conteudo: {
        type: String,
        required: false
    },

    paginas: {
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

Listagem.plugin(mongoosePaginate)

mongoose.model('listagem', Listagem)
