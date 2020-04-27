//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Contato")
const Contato = mongoose.model("contato")

require("../models/Usuario")
const Usuarios = mongoose.model("usuario")

require("../models/Materia")
const Materia = mongoose.model("materia")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
//    res.render("dashboard/dashboard", { layout: 'adm.handlebars'})

    Contato.count().then((contato) => {
        Usuarios.count().then((usuarios) =>{
            Materia.find().then((materia) =>{
                res.render("dashboard/dashboard", { layout: 'adm.handlebars', contato, usuarios, materia, usuario })
            })
            
        })
    }).catch((erro) =>{
        res.render("dashboard/dashboard", { layout: 'adm.handlebars'})
    })
})

module.exports = router