//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/ContatoInfo")
const ContatoInfo = mongoose.model("contatoinfo")

require("../models/Contato")
const Contato = mongoose.model("contato")


require("../models/Rodape")
const Rodape = mongoose.model("rodape")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", (req, res) => {

    ContatoInfo.findOne({}).then((contatoinfo) => {
        Rodape.findOne({}).then((rodape) => {
            res.render("contato/contato", { contatoinfo: contatoinfo, rodape: rodape })
        }).catch((erro) => {
            res.send("Nenhuma Informação encontrada!!" + erro)
        })

        //Insere primeiro contato
        if (!contatoinfo) {
            new ContatoInfo({
                titulo: "Entre em Contato - Empresa",
                subtitulo: "Escolha o canal de atendimento de sua preferencia",
                tituloform: "Solicite mais informação",
                titulohratend: "Fale Conosco",
                hratend: "Segunda a Sexta 08:00 ás 11:30 e 13:00 as 18:00",
                tituloend: "Logradouro",
                logradouro: "Rua Teste",
                bairro: "Bairro",
                complemento: "Qd 0 Lt 0",
                cidade: "Goiânia",
                uf: "GO",
                telefone: "(62) 98556-7314"
            }).save().then(() => {
                console.log("Contato Cadastrado com sucesso")
            }).catch((erro) => {
                console.log("Erro ao cadastrar Contato.")
            })
        }

    }).catch((erro) => {
        res.send("Nenhuma Informação encontrada!!" + erro)
    })


})
router.get("/contato-pais", (req, res) => {
    res.render("contato/contato-pais", { layout: "adm.handlebars" })
})
router.post("/add-contato", (req, res) => {
    var dados_contato = req.body
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Necessário preencher o campo nome!" })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        errors.push({ error: "Necessário preencher o campo E-mail!" })
    }

    if (!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null) {
        errors.push({ error: "Necessário preencher o campo Assunto!" })
    }

    if (!req.body.mensagem || typeof req.body.mensagem == undefined || req.body.mensagem == null) {
        errors.push({ error: "Necessário preencher o campo Mensagem!" })
    }

    if (errors.length > 0) {
        ContatoInfo.findOne({}).then((contatoinfo) => {
            Rodape.findOne({}).then((rodape) => {
                res.render("contato/contato", { errors: errors, contato: dados_contato, contatoinfo: contatoinfo, rodape: rodape })
            }).catch((erro) => {
                res.send("Nenhuma Informação encontrada!!" + erro)
            })

        }).catch((erro) => {
            res.send("Nenhuma Informação encontrada!!" + erro)
        })


    } else {
        const addContato = {
            nome: req.body.nome,
            email: req.body.email,
            assunto: req.body.assunto,
            mensagem: req.body.mensagem
        }

        new Contato(addContato).save().then(() => {
            req.flash("success_msg", "Mensagem de contato enviada com sucesso!")
            res.redirect("/contato")
        }).catch((erro) => {
            ContatoInfo.findOne({}).then((contatoinfo) => {
                Rodape.findOne({}).then((rodape) => {
                    errors.push({ error: "Erro: Mensagem de contato não enviada com sucesso! " + erro })
                    res.render("contato/contato", { errors: errors, contato: dados_contato, contatoinfo: contatoinfo, rodape: rodape })
                }).catch((erro) => {
                    res.send("Nenhuma Informação encontrada!" + erro)
                })

            }).catch((erro) => {
                res.send("Nenhuma Informação encontrada!!" + erro)
            })

        })

    }


})
router.get("/list-contato", eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Contato.paginate({}, { page, limit: 20 }).then((contato) => {
        res.render("contato/list-contato", { layout: 'adm.handlebars', contatos: contato })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de contato encontrada!")
        res.redirect("/dashboard/")
    })

    /*   Contato.find({}).then((contato) => {
           res.render("contato/list-contato", { layout: 'adm.handlebars', contato: contato })
       }).catch((erro) => {
           req.flash("error_msg", "Error: Nenhuma mensagem de contato encontrada!")
           res.redirect("/dashboard/")
       })
   
       */
})


router.get("/vis-contato/:id", eAdmin, (req, res) => {

    Contato.findOne({ _id: req.params.id }).then((contato) => {
        res.render("contato/vis-contato", { layout: "adm.handlebars", contato: contato })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de contato encontrada!")
        res.redirect("/contato/list-contato")
    })

})


module.exports = router