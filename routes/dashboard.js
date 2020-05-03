//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Usuario")
const Usuarios = mongoose.model("usuario")

require("../models/Materia")
const Materia = mongoose.model("materia")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
//    res.render("dashboard/dashboard", { layout: 'adm.handlebars'})

        Usuarios.find({tipoUsuario: 'A'}).sort({ field: 'asc', nome: 0 }).then((usuarios) =>{
            Materia.find().then((materia) =>{
                res.render("dashboard/dashboard", { layout: 'adm.handlebars', usuarios, materia, usuario })
            })
            
        })
})

module.exports = router