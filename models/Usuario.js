const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        required: false
    },

    estatus : {
        type: Boolean,
        default: false
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

Usuario.plugin(mongoosePaginate)
mongoose.model("usuario", Usuario)