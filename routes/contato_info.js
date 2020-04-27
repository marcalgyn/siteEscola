//Carrega os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const fs = require("fs") //file string

require("../models/ContatoInfo")
const ContatoInfo = mongoose.model("contatoinfo")
const { eAdmin } = require("../helpers/eAdmin")

router.get("/vis-contato-info", eAdmin, (req, res) => {
    ContatoInfo.findOne({}).then((contatoinfo) =>{
        res.render("contato-info/vis-contato-info", {layout: "adm.handlebars", contatoinfo: contatoinfo})
    }).catch((erro) =>{
        req.flash("error_msg", "Não foi encontrado nenhum registro sobre Informação de COntato!")
        
    })
})

router.get("/edit-contato-info", eAdmin, (req, res) => {
    ContatoInfo.findOne({}).then((contatoinfo) =>{
        
        res.render("contato-info/edit-contato-info", {layout: "adm.handlebars", contatoinfo: contatoinfo})
    }).catch((erro) =>{
        req.flash("error_msg", "Error: Não foi encontrado nenhum registro sobre informações de Contato")
        res.redirect("/dashboard")
    })
})

router.post("/update-contato-info", eAdmin, (req, res) =>{
    var dados_contato_info = req.body
    var errors = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        errors.push({error: "Erro Necessário preencher o campo titulo da pagina"})
    }

    //Colocar todas as validações de todos os campos aqui

    if (errors.length> 0){
        res.render("contato-info/edit-contato-info", {layout: "adm.handlebars", errors: errors, contatoinfo: dados_contato_info})
    } else {
        
        ContatoInfo.findOne({_id: req.body._id}).then((contatoinfo) =>{
            contatoinfo.titulo = req.body.titulo,
            contatoinfo.subtitulo = req.body.subtitulo,
            contatoinfo.tituloform = req.body.tituloform,
            contatoinfo.titulohratend = req.body.titulohratend,
            contatoinfo.hratend = req.body.hratend,
            contatoinfo.tituloend = req.body.tituloend,
            contatoinfo.logradouro = req.body.logradouro,
            contatoinfo.bairro = req.body.bairro,
            contatoinfo.complemento = req.body.complemento,
            contatoinfo.cidade = req.body.cidade,
            contatoinfo.uf = req.body.uf,
            contatoinfo.telefone = req.body.telefone

            

            contatoinfo.save().then(() =>{
                req.flash("success_msg", "Informações de contato foi editado com sucesso")
                res.redirect("/contato-info/vis-contato-info")
            }).catch((erro) =>{
                req.flash("error_msg", "Erro: Informações de contato não foi editado com sucesso" + erro)
                res.redirect("/dashboard/")
            })
        }).catch((erro)=>{
            req.flash("error_msg", "Erro: Não foi encontrado nenhum registro" + erro)
            res.redirect("/dashboard/")
        })
    }

 })
  router.get("/edit-contato-info-img", eAdmin, (req, res) =>{
     res.render("contato-info/edit-contato-info-img", {layout: "adm.handlebars"} )
 })

 const storage = multer.diskStorage({
    destination: function (req, res, cb) {
       //Original cb(null, "public/images/topo_contato")
       cb(null, "public/images/topo_home")
    },
    filename: function (req, res, cb) {
       //Original cb(null, "topo-contato.jpg")
       cb(null, "home-top2.jpg")
       
    }
})



const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

router.post("/update-contato-info-img", eAdmin, upload.single("file"), (req, res, next) => {

    const file = req.file
    if (!file) {
        req.flash("error_msg", "Selecione uma imagem Jpeg")
        res.redirect("/contato-info/edit-contato-info-img/")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso")
        res.redirect("/contato-info/vis-contato-info")
    }


})

module.exports = router
