//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Imagem")
const Imagem = mongoose.model("imagem")
require("../models/Rodape")
const Rodape = mongoose.model("rodape")


const multer = require("multer")
const path = require("path")
const fs = require("fs")


const { eAdmin } = require("../helpers/eAdmin")


router.get("/", (req, res) => {

    Imagem.find({}).then((imagem) => {
        Rodape.findOne({}).then((rodape) => {
            res.render("imagem/imagem", { imagem: imagem, rodape: rodape })
        }).catch((erro) => {
            res.send("Nenhuma Informação encontrada!!" + erro)
        })

    }).catch((erro) => {
        res.send("Nenhuma Informação encontrada!!" + erro)
    })

})

const storage = multer.diskStorage({

    destination: function (req, res, cb) {
        cb(null, "public/images/galeria")
        console.log("Destino: " + req.filename + ' - ' + req.file)
    },

    filename: function (req, res, cb) {
        cb(null, res.originalname)
        console.log("file Name: " + res.originalname)
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

router.post("/add-imagem", eAdmin, upload.single("file"), (req, res, next) => {
    var dados_imagem = req.body
    var errors = []
    const file = req.file
    req.body.nome = res.originalname

    console.log("Entrou aqui - /*" + res.originalname)

    /* if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Necessário preencher o nome da foto!" })
    }
*/

    if (errors.length > 0) {
        res.render("imagem/edit-imagem", { layout: "adm.handlebars", errors: errors, imagem: dados_imagem })
    } else {
        Imagem.findOne({}).then((imagem) => {
            const addImagem = {
                nome: file.originalname,
                local: req.file.path,
                url: "/images/galeria/" + file.originalname
            }

            new Imagem(addImagem).save().then((imagem) => {
                req.flash("success_msg", "Imagem de Cadastrada com sucesso!")
                res.redirect("/imagem/list-imagem")
            })
        }).catch((erro) => {
            res.send("Nenhuma Informação encontrada!!" + erro)

        }).catch((erro) => [

        ])

    }


})

router.get("/edit-imagem", eAdmin, (req, res) => {
    res.render("imagem/edit-imagem", { layout: 'adm.handlebars' })
})



router.get("/list-imagem", eAdmin, (req, res) => {
    
    const { page = 1 } = req.query
    Imagem.paginate({}, { page, limit: 10 }).then((imagem) => {
        res.render("imagem/vis-imagem", { layout: 'adm.handlebars', imagens: imagem })

        if (!imagem) {
            //Insere primeiro contato
            new ImagemAdd({
                nome: "logo_v1.png",
                local: "/public/images/",
                url: "/images/logo_v1.png"

            }).save().then(() => {
                console.log("Imagem Cadastrada com Sucesso")
            }).catch((erro) => {
                console.log("Erro ao cadastrar Contato.")
            })

        }

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma Imamgem Listada")
        res.redirect("/dashboard/")
    })
})



router.get("/edit-imagem/:id", eAdmin, (req, res) => {

    Imagem.findOne({ _id: req.params.id }).then((imagem) => {
        const { page = 1 } = req.query
        Imagem.paginate({}, { page, limit: 10 }).then((imagem) => {
            res.render("/list-imagem", { layout: 'adm.handlebars', imagens: imagem })
        })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhuma mensagem de contato encontrada!")
        res.redirect("/imagem/list-imagem")
    })

})


router.get("/del-imagem/:id", eAdmin, (req, res) => {
    
    Imagem.deleteOne({ _id: req.params.id }).then(() => {
        const { page = 1 } = req.query
        Imagem.paginate({}, { page, limit: 10 }).then((imagem) => {
            req.flash('success_msg', 'Imagem removida com sucesso')
            res.render("imagem/vis-imagem", { layout: 'adm.handlebars', imagens: imagem })
        })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Noi foi excluido")
        res.redirect('/dashboard/', { layout: "adm.handlebars" })
    })

})



module.exports = router