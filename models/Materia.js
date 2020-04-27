const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema


const Materia = new Schema({
    nome: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        default: 'bg-info'
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

Materia.plugin(mongoosePaginate)

mongoose.model("materia", Materia)