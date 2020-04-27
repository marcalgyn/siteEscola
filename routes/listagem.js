//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Atividade")
const Atividade = mongoose.model("atividade")

require("../models/Listagem")
const Listagem = mongoose.model("listagem")

require("../models/Materia")
const Materia = mongoose.model("materia")

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", (req, res) => {

    let idAtividade = req.query.id;

    console.log(req.query.id);
    console.log(req.params.id);

    Listagem.find({}).then((listagem) => {
        Atividade.findOne().sort({ field: 'asc', _id: -1 }).then((atividade) => {
            let materia = atividade.materia;
            let conteudo = atividade.conteudo;
            let idAtividade = atividade._id;
            let nomeProfessor = atividade.nomeProfessor;
            let paginas = atividade.paginaInicial + '/' + atividade.paginaFinal;

            console.log("atividade " + atividade)
            res.render("listagem/cad-listagem", { layout: 'adm.handlebars', listagem, atividade, materia, conteudo, idAtividade, nomeProfessor, paginas })
        })

    }).catch((erro) => {
        res.send("Nenhuma Informação encontrada!!" + erro)
    })
})

router.get("/lista/:id", (req, res) => {
    console.log(req.params.id);

    Atividade.find({idMateria: req.params.id}).then((atividade) => {
            console.log("atividade " + atividade);
            Listagem.find({idAtividade: atividade}).then((listagem) =>{
                console.log("Listagem " + listagem)
                res.render("listagem/vis-listagem-professor", { layout: 'adm.handlebars', listagem, atividade })

            })
        })

})


/* Inserir varias imagens */

const storage = multer.diskStorage({
    //Destino
    destination: function (req, file, cb) {
        cb(null, "public/docs/")

    },

    filename: function (req, file, cb) {
        cb(null, req.body.idAtividade + '_' + `${file.originalname}`)
        console.log("Define: " + req.body.idAtividade + '_' + `${file.originalname}`)
    }
})

var limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({ storage: storage }).array("file", 10);


router.post("/add-imagem", eAdmin, (req, res, next) => {

    var dados_imagem = req.body
    var errors = []

    upload(req, res, function (erro) {
        let galeria = []
        var file = req.files.map((image) => galeria.push(`${image.filename}`))
        console.log('arquivo: ' + req.files);


        if (errors.length > 0) {
            res.render("listagem/cadastro-listagem", { layout: "adm.handlebars", errors: errors, imagem: dados_imagem })
        } else {

            for (let i = 0; i < req.files.length; i++) {
                new Listagem({
                    local: "/docs/" + req.body.idAtividade + '_' + req.files[i].originalname,
                    url: "/docs/" + req.body.idAtividade + "_" + req.files[i].originalname,
                    idAtividade: req.body.idAtividade,
                    materia: req.body.materia,
                    nomeProfessor: req.body.nomeProfessor,
                    conteudo: req.body.conteudo,
                    paginas: req.body.paginas

                }).save().then(() => {
                    req.flash("success_msg", "Imagem de Cadastrada com sucesso!")
                    res.redirect("/listagem/list-listagem")
                }).catch((erro) => {
                    res.send("Nenhuma Informação encontrada!!" + erro)

                })
                console.log("Arquivo Inserido: " + req.body.idAtividade + '_' + req.files[i].originalname)
            }


        }

    })
})

router.get('/list-listagem', (req, res) => {
    let usuario = res.locals.user;
    
    const { page = 1 } = req.query;
    Materia.find({}).then((materia) => {
        Atividade.find({}).then((atividade) => {
            Listagem.paginate({}, { page, limit: 10 }).then((listagem) => {
                res.render("listagem/vis-listagem", { layout: 'adm.handlebars', listagem, atividade, materia, usuario })
            }).catch((erro) => {
                req.flash("error_msg", "Error: Nenhuma Lista de Tarefa Listada!!")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Nenhuma Atividade Listada!!")
        })
    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma Materia Listada!!")
        res.redirect("/dashboard/")
    })

})


router.get("/del-imagem/:id", eAdmin, (req, res) => {

    Listagem.deleteOne({ _id: req.params.id }).then(() => {
        const { page = 1 } = req.query;
        Materia.find({}).then((materia) => {
            Atividade.find({}).then((atividade) => {
                Listagem.paginate({}, { page, limit: 10 }).then((listagem) => {
                    req.flash('success_msg', 'Arquivo removida com sucesso')
                    res.render("listagem/vis-listagem", { layout: 'adm.handlebars', listagem, atividade, materia })
                }).catch((erro) => {
                    req.flash("error_msg", "Error: Nenhuma Lista de Tarefa Listada!!")
                })
            }).catch((erro) => {
                req.flash("error_msg", "Error: Nenhuma Atividade Listada!!")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Error: Nenhuma Materia Listada!!")
            res.redirect("/dashboard/")
        })
    })
})


module.exports = router