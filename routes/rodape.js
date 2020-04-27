//Carregar os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Rodape")
const Rodape = mongoose.model("rodape")


const { eAdmin } = require("../helpers/eAdmin")

router.get("/vis-rodape", (req, res) => {
    Rodape.findOne({}).then((rodape) => {
        res.render("rodape/vis-rodape", { layout: "adm.handlebars", rodape })
    }).catch((erro) => {
        res.render("rodape/vis-rodape", { layout: "adm.handlebars", rodape })
        //res.send("Nenhuma infromação sobre o rodapé encontrado")
    })
})

router.get("/edit-rodape", eAdmin, (req, res) => {

    Rodape.findOne({}).then((rodape) => {
        res.render("rodape/edit-rodape", { layout: "adm.handlebars", rodape: rodape })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: não foi encontrado nenhum registro sobre rodape")
        res.redirect("/dashboard")
    })
})

router.post("/update-rodape", eAdmin, (req, res) => {
    var dados_rodape = req.body
    var errors = []

    if (!req.body.titulopg || typeof req.body.titulopg == undefined || req.body.titulopg == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Pagina." })
    }

    if (!req.body.titulopgum || typeof req.body.titulopgum == undefined || req.body.titulopgum == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Pagina Um" })
    }

    if (!req.body.urlpgum || typeof req.body.urlpgum == undefined || req.body.urlpgum == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Pagina Um" })
    }

    if (!req.body.titulopgdois || typeof req.body.titulopgdois == undefined || req.body.titulopgdois == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Pagina dois" })
    }

    if (!req.body.urlpgdois || typeof req.body.urlpgdois == undefined || req.body.urlpgdois == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Pagina Dois" })
    }

    if (!req.body.titulopgtreis || typeof req.body.titulopgtreis == undefined || req.body.titulopgtreis == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Pagina treis" })
    }

    if (!req.body.urlpgtreis || typeof req.body.urlpgtreis == undefined || req.body.urlpgtreis == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Pagina Tries" })
    }

    if (!req.body.tituloend || typeof req.body.tituloend == undefined || req.body.tituloend == null) {
        erros.push({ error: "Erro: Necessário preencher Tintulo Endereço" })
    }

    if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null) {
        erros.push({ error: "Erro: Necessário preencher Telefone" })
    }

    if (!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
        erros.push({ error: "Erro: Necessário preencher Endereço" })
    }

    if (!req.body.cnpj || typeof req.body.cnpj == undefined || req.body.cnpj == null) {
        erros.push({ error: "Erro: Necessário preencher Cnpj" })
    }

    if (!req.body.tituloredsoc || typeof req.body.tituloredsoc == undefined || req.body.tituloredsoc == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Rede Social" })
    }

    if (!req.body.titulorsum || typeof req.body.titulorsum == undefined || req.body.titulorsum == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Rede Social um" })
    }

    if (!req.body.urlrdum || typeof req.body.urlrdum == undefined || req.body.urlrdum == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Rede Social um" })
    }

    if (!req.body.titulorsdois || typeof req.body.titulorsdois == undefined || req.body.titulorsdois == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Rede Social dois" })
    }

    if (!req.body.urlrddois || typeof req.body.urlrddois == undefined || req.body.urlrddois == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Rede Social dois" })
    }

    /*
    if (!req.body.titulorstreis || typeof req.body.titulorstreis == undefined || req.body.titulorstreis == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Rede Social Treis" })
    }

    if (!req.body.urlrdtreis || typeof req.body.urlrdtreis == undefined || req.body.urlrdtreis == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Rede Social Treis" })
    }

    if (!req.body.titulorsquatro || typeof req.body.titulorsquatro == undefined || req.body.titulorsquatro == null) {
        erros.push({ error: "Erro: Necessário preencher Titulo da Rede Social Quatro" })
    }

    if (!req.body.urlrdquatro || typeof req.body.urlrdquatro == undefined || req.body.urlrdquatro == null) {
        erros.push({ error: "Erro: Necessário preencher URL da Rede Social Quatro" })
    }
    */

    if (errors.length > 0) {
        res.render("home/edit-rodape", { layout: "adm.handlebars", errors: errors, rodape: dados_rodape })
    } else {
        Rodape.findOne({ _id: req.body._id }).then((rodape) => {
            rodape.titulopg = req.body.titulopg,
                rodape.titulopgum = req.body.titulopgum,
                rodape.urlpgum = req.body.urlpgum,
                rodape.titulopgdois = req.body.titulopgdois,
                rodape.urlpgdois = req.body.urlpgdois,
                rodape.titulopgtreis = req.body.titulopgtreis,
                rodape.urlpgtreis = req.body.urlpgtreis,
                rodape.tituloend = req.body.tituloend,
                rodape.telefone = req.body.telefone,
                rodape.endereco = req.body.endereco,
                rodape.cnpj = req.body.cnpj,
                rodape.tituloredsoc = req.body.tituloredsoc,
                rodape.titulorsum = req.body.titulorsum,
                rodape.urlrdum = req.body.urlrdum,
                rodape.titulorsdois = req.body.titulorsdois,
                rodape.urlrddois = req.body.urlrddois,
                rodape.titulorstreis = req.body.titulorstreis,
                rodape.urlrdtreis = req.body.urlrdtreis,
                rodape.titulorsquatro = req.body.titulorsquatro,
                rodape.urlrdquatro = req.body.urlrdquatro

            rodape.save().then(() => {
                req.flash("success_msg", "O Conteudo do rodape da pagina foi editado com sucesso")
                res.redirect("/rodape/vis-rodape")
            }).catch((erro) => {
                req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para o rodape da pagina")
                res.redirect("/dashboard/")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para o rodape da pagina")
                res.redirect("/dashboard/")

        })
    }

})



module.exports = router