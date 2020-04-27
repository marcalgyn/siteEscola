//Carregar os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Materia")
const Materia = mongoose.model("materia")

require("../models/Atividade")
const Atividade = mongoose.model("atividade")

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { eAdmin } = require("../helpers/eAdmin")

router.get("/", (req, res) => {
    let usuario = res.locals.user;
    Materia.find({}).then((materia) => {
        Atividade.find({}).then((atividade) => {
            res.render("atividade/cadastro-atividade", { layout: 'adm.handlebars', atividade, materia, usuario })
        })

    }).catch((erro) => {
        res.send("Nenhuma Informação encontrada!!" + erro)
    })
})

router.post("/insert-cad-atividade", eAdmin, (req, res) => {

    var atividade = req.body
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Erro: Necessário preencher o Nome do Usuario!" })
    }

    if (!req.body.paginaInicial || typeof req.body.paginaInicial == undefined || req.body.paginaInicial == null) {
        errors.push({ error: "Erro: Necessário preencher o Numero da Pagina Inicial!" })
    }

    if (!req.body.paginaFinal || typeof req.body.paginaFinal == undefined || req.body.paginaFinal == null) {
        errors.push({ error: "Erro: Necessário preencher o Numero da Pagina Final!" })
    }

    if (!req.body.idMateria || typeof req.body.idMateria == undefined || req.body.idMateria == null) {
        errors.push({ error: "Erro: Necessário preencher a Materia !" })
    }
    if (errors.length > 0) {
        Materia.find({}).then((materia) => {
            res.render("atividade/cadastro-atividade", { layout: 'adm.handlebars', errors: errors, materia })
        })
    } else {

        if (!req.body._id) {
            Materia.findById(req.body.idMateria).then((materia) => {
                new Atividade({
                    nomeProfessor: materia.professor,
                    dataAtividade: req.body.dataAtividade,
                    conteudo: req.body.conteudo,
                    descricao: req.body.descricao,
                    paginaInicial: req.body.paginaInicial,
                    paginaFinal: req.body.paginaFinal,
                    idMateria: req.body.idMateria,
                    materia: materia.nome
                }).save().then(() => {
                    req.flash("success_msg", "Tarefa Cadastrada com sucesso");
                    res.redirect("/listagem/");
                }).catch((erro) => {
                    req.flash("error_msg", "Atividade não foi inserido com sucesso" + erro)
                    res.redirect("/atividade")
                })

            })

        } else {
            Materia.findById(req.body.idMateria).then((materia) => {
                Atividade.findOne({ _id: req.body._id }).then((atividade) => {
                    atividade.nomeProfessor = materia.professor,
                        atividade.dataAtividade = req.body.dataAtividade,
                        atividade.conteudo = req.body.conteudo,
                        atividade.descricao = req.body.descricao,
                        atividade.paginaInicial = req.body.paginaInicial,
                        atividade.paginaFinal = req.body.paginaFinal,
                        atividade.idMateria = req.body.idMateria,
                        atividade.materia = materia.nome
                    atividade.save().then(() => {
                        req.flash("success_msg", "Cadastro de Atividade editado com sucesso")
                        res.redirect("/atividade/list-atividade")
                    }).catch((erro) => {
                        req.flash("error_msg", "O cadastro Não foi editado com sucesso " + erro)
                        res.redirect("/atividade")
                    })
                }).catch((erro) => {
                    req.flash("error_msg", "Não foi encontrado nenhum registro Materia!")
                    res.redirect("/dashboard/")
                })
            })

        }

    }
})

router.get("/list-atividade", eAdmin, (req, res) => {
    const { page = 1 } = req.query

    /*Modelo de Popular uma tabela */
    Atividade.find({}).populate([
        {
            path: 'idMateria',
            select: 'professor',
            model: 'materia'
        }
    ]).exec(function (erro, c) {
        if (erro) throw erro
        console.log("resultado " + c);
    })
    /* fim do exemplo */

    Materia.find({}).then((materia) => {
        Atividade.paginate({}, { page, limit: 20 }).then((atividade) => {
            res.render("atividade/list-atividade", { layout: "adm.handlebars", atividade, materia })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Nenhuma Materia encontrada!" + erro)
            res.redirect("/atividade")
        })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de Materia encontrada!" + erro)
        res.redirect("/atividade")

    })


})


router.get("/vis-atividade/:id", eAdmin, (req, res) => {

    Atividade.findOne({ _id: req.params.id }).then((atividade) => {
        var idMateria = atividade.idMateria;
        console.log(idMateria);
        //Materia.findById({_id: idMateria}).then((materia) =>{
        Materia.find({}).then((materia) => {
            res.render("atividade/cadastro-atividade", { layout: "adm.handlebars", atividade, materia })
        })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de Materia encontrada!")
        res.redirect("atividade/list-atividade")
    })
})

router.get("/del-atividade/:id", eAdmin, (req, res) => {

    Atividade.deleteOne({ _id: req.params.id }).then(() => {
        const { page = 1 } = req.query;
        Materia.find({}).then((materia) => {
            Atividade.paginate({}, { page, limit: 20 }).then((atividade) => {
                res.render("atividade/list-atividade", { layout: "adm.handlebars", atividade, materia })
            }).catch((erro) => {
                req.flash("error_msg", "Error: Nenhuma Materia encontrada!" + erro)
                res.redirect("/atividade")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Nenhuma mensagem de Materia encontrada!" + erro)
            res.redirect("/atividade")
    
        })
    })
})



module.exports = router