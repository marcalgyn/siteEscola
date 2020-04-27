//Carregar os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Materia")
const Materia = mongoose.model("materia")

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { eAdmin } = require("../helpers/eAdmin")

router.get("/", (req, res) => {

    Materia.find({}).then((materias) => {
        res.render("materia/cadastro-materia", { layout: 'adm.handlebars', materias })
    }).catch((erro) => {
        res.send("Nenhuma Informação encontrada!!" + erro)
    })
})

router.post("/insert-cad-materia", eAdmin, (req, res) => {

    var materia = req.body
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Erro: Necessário preencher o Nome do Usuario!" })
    }

    if (!req.body.professor || typeof req.body.professor == undefined || req.body.professor == null) {
        errors.push({ error: "Erro: Necessário preencher o Nome do Professor!" })
    }

    if (errors.length > 0) {
        res.render("materia/cadastro-materia", { layout: 'adm.handlebars', errors: errors, materias })
    } else {
        console.log(req.body.nome + ' - ' + req.body.professor);

        if (!req.body._id) {
            new Materia({
                nome: req.body.nome,
                professor: req.body.professor,
                cor: req.body.cor

            }).save().then(() => {

                req.flash("success_msg", "Materia Cadastradada com sucesso");
                res.redirect("/materia");
            }).catch((erro) => {
                req.flash("error_msg", "Materia não foi inserido com sucesso" + erro)
                res.redirect("/materia")
            })
        } else {
            Materia.findOne({ _id: req.body._id }).then((materia) => {
                materia.nome = req.body.nome,
                    materia.professor = req.body.professor,
                    materia.cor = req.body.cor

                materia.save().then(() => {

                    req.flash("success_msg", "Cadastro de Materia editado com sucesso")
                    res.redirect("/materia/list-materia")
                }).catch((erro) => {
                    req.flash("error_msg", "O cadsatro Não foi editado com sucesso " + erro)
                    res.redirect("/materia")
                })
            }).catch((erro) => {
                req.flash("error_msg", "Não foi encontrado nenhum registro Materia!")
                res.redirect("/dashboard/")
            })

        }

    }
})

router.get("/list-materia", eAdmin, (req, res) => {
    const { page = 1 } = req.query
    Materia.paginate({}, { page, limit: 20 }).then((materia) => {
        res.render("materia/list-materia", { layout: "adm.handlebars", materia })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de Materia encontrada!")
        res.redirect("materia/list-materia")
    })

})


router.get("/vis-materia/:id", eAdmin, (req, res) => {

    Materia.findOne({ _id: req.params.id }).then((materias) => {

        res.render("materia/cadastro-materia", { layout: "adm.handlebars", materias })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de Materia encontrada!")
        res.redirect("materia/list-materia")
    })
})

module.exports = router