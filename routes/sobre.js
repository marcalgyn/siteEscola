//Carrega os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const fs = require("fs") //file string



require("../models/Sobre")
const Sobre = mongoose.model("sobre")
require("../models/Rodape")
const Rodape = mongoose.model("rodape")
const { eAdmin } = require("../helpers/eAdmin")



router.get("/", (req, res) => {

    Sobre.findOne({}).then((sobre) => {
        Rodape.findOne({}).then((rodape) => {
            res.render("sobre/sobre", { sobre: sobre, rodape: rodape })
            if (!rodape) {
                new Rodape({
                    titulopg: "Paginas",
                    titulopgum: "Home",
                    urlpgum: "/home",
                    titulopgdois: "Sobre",
                    urlpgdois: "/sobre",
                    titulopgtreis: "Contato",
                    urlpgtreis: "/contato",
                    tituloend: "Contato",
                    telefone: "(62) 98556-7314",
                    endereco: "Rua Goiânia-GO",
                    cnpj: "12.123.456./0001-00",
                    tituloredsoc: "Rede Sociais",
                    titulorsum: "Facebook",
                    urlrdum: "http://facebook.com/marcalsilvio",
                    titulorsdois: "Instagram",
                    urlrddois: "https://www.instagram.com/silvio.marcal",
                    titulorstreis: "Linkedin",
                    urlrdtreis: "https://www.linkedin.com/in/silvio-marçal-97127b25/",
                    titulorsquatro: "Twitter",
                    urlrdquatro: "https://twitter.com/",
                }).save().then(() => {
                    console.log("Rodape Cadastrado com sucesso")
                }).catch((erro) => {
                    console.log("Erro ao cadastrar Rodape.")
                })
            }

        }).catch((erro) => {
            req.flash("error_msg", "O Sobre Não foi editado com sucesso")
            res.redirect("/dashboard/")
        })
        if (!sobre) {
            new Sobre({
                titulotop: "Nome da Empresa",
                subtitulotop: "Descrição Top",
                titulo: "Somos uma empresa...",
                subtitulo: "Subtitulo da empresa",
                iconesbum: "fas fa-route",
                titulosbum: "EXPERIENCIA",
                descsbum: "Descrição da experiencia um....",
                iconesbdois: "fas fa-satellite",
                titulosbdois: "TECNOLOGIA",
                descsbdois: "Descrição da Tecnologia.....",
                iconesbtreis: "far fa-handshake",
                titulosbtreis: "PROXIMIDADE",
                descsbtreis: "Descrição da proximidade...",
                titulobtn: "ENTRE EM CONTATO",
                urlbtn: "/contato"

            }).save().then(() => {
                req.flash("success_msg", "O Sobre foi editado com sucesso")
                res.redirect("/sobre/vis-sobre")
            }).catch((erro) => {
                req.flash("error_msg", "O Sobre Não foi editado com sucesso")
                res.redirect("/dashboard/")
            })
        }
    }).catch((erro) => {
        req.flash("error_msg", "Não foi encontrado nenhum registro sobre empresa!")
        res.redirect("/dashboard/")

    })
})

router.get("/edit-sobre", eAdmin, (req, res) => {
    Sobre.findOne({}).then((sobre) => {
        res.render("sobre/edit-sobre", { layout: 'adm.handlebars', sobre: sobre })
    }).catch((erro) => {
        req.flash("error_msg", "Não foi encontrado nenhum registro sobre empresa!")
        res.redirect("/dashboard/")
    })


})

router.post("/update-sobre", eAdmin, (req, res) => {
    var dados_sobre = req.body
    var errors = []

    if (!req.body.titulotop || typeof req.body.titulotop == undefined || req.body.titulotop == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do Banner!" })
    }
    // criar validação para todos os campos
    if (!req.body.subtitulotop || typeof req.body.subtitulotop == undefined || req.body.subtitulotop == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Subtitulo do Banner!" })
    }

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo!" })
    }

    if (!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo subtitulo!" })
    }

    if (!req.body.iconesbum || typeof req.body.iconesbum == undefined || req.body.iconesbum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Icone!" })
    }

    if (!req.body.titulosbum || typeof req.body.titulosbum == undefined || req.body.titulosbum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Titulo!" })
    }

    if (!req.body.descsbum || typeof req.body.descsbum == undefined || req.body.descsbum == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Descrição!" })
    }

    if (!req.body.iconesbdois || typeof req.body.iconesbdois == undefined || req.body.iconesbdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Icone!" })
    }

    if (!req.body.titulosbdois || typeof req.body.titulosbdois == undefined || req.body.titulosbdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Titulo!" })
    }

    if (!req.body.descsbdois || typeof req.body.descsbdois == undefined || req.body.descsbdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Descrição!" })
    }

    if (!req.body.iconesbtreis || typeof req.body.iconesbtreis == undefined || req.body.iconesbtreis == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Icone!" })
    }

    if (!req.body.titulosbtreis || typeof req.body.titulosbdois == undefined || req.body.titulosbdois == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Titulo!" })
    }

    if (!req.body.descsbtreis || typeof req.body.descsbtreis == undefined || req.body.descsbtreis == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Descrição!" })
    }

    if (!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Titulo do Botão!" })
    }

    if (!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null) {
        errors.push({ error: "Erro: Necessário preencher o campo URL do Botão!" })
    }

    if (errors.length > 0) {
        res.render("sobre/edit-sobre", { layout: 'adm.handlebars', errors: errors, sobre: dados_sobre })
    } else {
        Sobre.findOne({ _id: req.body._id }).then((sobre) => {
            sobre.titulotop = req.body.titulotop,
                sobre.subtitulotop = req.body.subtitulotop,
                sobre.titulo = req.body.titulo,
                sobre.subtitulo = req.body.subtitulo,
                sobre.titulosbum = req.body.titulosbum,
                sobre.iconesbum = req.body.iconesbum,
                sobre.descsbum = req.body.descsbum,
                sobre.titulosbdois = req.body.titulosbdois,
                sobre.iconesbdois = req.body.iconesbdois,
                sobre.descsbdois = req.body.descsbdois,
                sobre.titulosbtreis = req.body.titulosbtreis,
                sobre.iconesbtreis = req.body.iconesbtreis,
                sobre.descsbteis = req.body.descsbtreis,
                sobre.titulobtn = req.body.titulobtn,
                sobre.urlbtn = req.body.urlbtn

            sobre.save().then(() => {
                req.flash("success_msg", "O Sobre foi editado com sucesso")
                res.redirect("/sobre/vis-sobre")
            }).catch((erro) => {
                req.flash("error_msg", "O Sobre Não foi editado com sucesso")
                res.redirect("/dashboard/")
            })

        }).catch((erro) => {
            req.flash("error_msg", "Não foi encontrado nenhum registro sobre empresa!")
            res.redirect("/dashboard/")
        })
    }
})

router.get("/vis-sobre", eAdmin, (req, res) => {

    Sobre.findOne({}).then((sobre) => {
        res.render("sobre/vis-sobre", { layout: 'adm.handlebars', sobre: sobre })
    }).catch((erro) => {
        req.flash("error_msg", "Não foi encontrado nenhum registro sobre empresa!")
        res.redirect("/dashboard/")
    })


})

router.get("/edit-sobre-img", eAdmin, (req, res) => {
    res.render("sobre/edit-sobre-img", { layout: 'adm.handlebars' })
})



// modelo const upload = multer({dest: "uploads" })

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        //Original   cb(null, "public/images/top-sobre")
        cb(null, "public/images/topo_home")

    },
    filename: function (req, res, cb) {
        //Original   cb(null, "descr-top-sobre.jpg")
        cb(null, "home-top1.jpg")
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})


router.post("/update-sobre-img", eAdmin, upload.single("file"), (req, res, next) => {

    const file = req.file
    if (!file) {
        req.flash("error_msg", "Selecione uma imagem Jpeg")
        res.redirect("/sobre/edit-sobre-img/")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso")
        res.redirect("/sobre/vis-sobre")
    }


})

module.exports = router