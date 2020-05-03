//Carregar os modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")


const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { eAdmin } = require("../helpers/eAdmin")

router.get("/", (req, res) => {

    res.render("usuario/login", { layout: 'login.handlebars' })


})


router.post("/update-home", eAdmin, (req, res) => {

    var dados_home = req.body
    var erros = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo titulo do Banner!" })
    }

    if (!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Subtitulo do Banner!" })
    }

    if (!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null) {
        errors.push({ error: "Erro: Necessário preencher o campo Titulo do Botão!" })
    }

    if (!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null) {
        errors.push({ error: "Erro: Necessário preencher o campo URL do Botão!" })
    }


    if (erros.length > 0) {
        res.render("/edit-home", { layout: 'adm.handlebars', errors: errors, hometopo: dados_home })
    } else {
        HomeTopo.findOne({ _id: req.body._id }).then((hometopo) => {

            hometopo.titulo = req.body.titulo,
                hometopo.subtitulo = req.body.subtitulo,
                hometopo.titulobtn = req.body.titulobtn,
                hometopo.urlbtn = req.body.urlbtn

            hometopo.save().then(() => {
                req.flash("success_msg", "A Home foi editado com sucesso")
                res.redirect("/vis-home")
            }).catch((erro) => {
                req.flash("error_msg", "A Home Não foi editado com sucesso " + erro)
                res.redirect("/dashboard/")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Não foi encontrado nenhum registro Home empresa!")
            res.redirect("/dashboard/")
        })

    }

})

router.get("/vis-home", eAdmin, (req, res) => {
    HomeTopo.findOne({}).then((hometopo) => {
        res.render("home/vis-home", { layout: "adm.handlebars", hometopo: hometopo })
    }).catch((erro) => {
        req.flash("error_msg", "Não foi encontrado nenhum registro Home empresa!")
        res.redirect("/dashboard/")
    })
})

router.get("/edit-home-img", eAdmin, (req, res) => {
    res.render("home/edit-home-img", { layout: 'adm.handlebars' })
})

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/images/topo_home")
    },
    filename: function (req, res, cb) {
        cb(null, "home-top.jpg")
    }
})

const uploads = multer({ storage: storage });

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

router.post("/home/update-home-img", eAdmin, upload.single("file"), (req, res, next) => {

    const file = req.file
    if (!file) {
        req.flash("error_msg", "Selecione uma imagem Jpeg")
        res.redirect("/home/edit-home-img/")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso")
        res.redirect("/vis-home")
    }


})

router.get("/edit-home-logo", eAdmin, (req, res) => {
    res.render("home/edit-home-logo", { layout: 'adm.handlebars' })
})

/* Rotina pode ser usada também para multiplos arquivos */
router.post("/home/update-home-logo", eAdmin, uploads.single("file"), (req, res, next) => {

    var formidable = require('formidable');
    var fs = require('fs')
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.logo.path;
        var newpath = 'public/images/' + "logo.jpg"; //files.filetoupload.name

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            req.flash("success_msg", "Upload realizado com sucesso")
            res.redirect("/vis-home")
        });
    });

})


router.get("/vis-home-serv", eAdmin, (req, res) => {
    Servico.findOne({}).then((servico) => {
        res.render("home/vis-home-serv", { layout: "adm.handlebars", servico: servico })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para serviço")
        res.redirect("/dashboard/")
    })
})

router.get("/edit-home-serv", eAdmin, (req, res) => {
    Servico.findOne({}).then((servico) => {
        res.render("home/edit-home-serv", { layout: "adm.handlebars", servico: servico })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para a pagina Inicial no conteudo do servico")
        res.redirect("/dashboard/")
    })
})


router.post("/update-home-serv", eAdmin, (req, res) => {
    var dados_home_serv = req.body
    var errors = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo" })
    }

    if (!req.body.tituloservum || typeof req.body.tituloservum == undefined || req.body.tituloservum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo" })
    }
    if (!req.body.iconeservum || typeof req.body.iconeservum == undefined || req.body.iconeservum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone um" })
    }
    if (!req.body.descservum || typeof req.body.descservum == undefined || req.body.descservum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição um" })
    }

    if (!req.body.tituloservdois || typeof req.body.tituloservdois == undefined || req.body.tituloservdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo 2" })
    }
    if (!req.body.iconeservdois || typeof req.body.iconeservdois == undefined || req.body.iconeservdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone 2" })
    }
    if (!req.body.descservdois || typeof req.body.descservdois == undefined || req.body.descservdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição 2" })
    }

    if (!req.body.tituloservtres || typeof req.body.tituloservtres == undefined || req.body.tituloservtres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo 3" })
    }
    if (!req.body.iconeservtres || typeof req.body.iconeservtres == undefined || req.body.iconeservtres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone 3" })
    }
    if (!req.body.descservtres || typeof req.body.descservtres == undefined || req.body.descservtres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição 3" })
    }

    if (errors.length > 0) {
        res.render("home/edit-home-serv", { layout: "adm.handlebars", errors: errors, servico: dados_home_serv })
    } else {
        Servico.findOne({ _id: req.body._id }).then((servico) => {
            servico.titulo = req.body.titulo,
                servico.tituloservum = req.body.tituloservum,
                servico.iconeservum = req.body.iconeservum,
                servico.descservum = req.body.descservum,
                servico.tituloservdois = req.body.tituloservdois,
                servico.iconeservdois = req.body.iconeservdois,
                servico.descservdois = req.body.descservdois,
                servico.tituloservtres = req.body.tituloservtres,
                servico.iconeservtres = req.body.iconeservtres,
                servico.descservtres = req.body.descservtres

            servico.save().then(() => {
                req.flash("success_msg", "O Conteudo do servio da pagina inicial foi editado com sucesso")
                res.redirect("/vis-home-serv")
            }).catch((erro) => {
                req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para a pagina inicial")
                res.redirect("/dashboard/")
            })

        }).catch((erro) => {
            req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para a pagina inicial para o conteudo inicial")
            res.redirect("/dashboard/")
        })
    }
})

router.get("/vis-home-video", eAdmin, (req, res) => {

    Video.findOne({}).then((video) => {
        res.render("home/vis-home-video", { layout: "adm.handlebars", video: video })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para Video")
        res.redirect("/dashboard/")
    })
})

router.get("/edit-home-video", eAdmin, (req, res) => {

    Video.findOne({}).then((video) => {
        res.render("home/edit-home-video", { layout: "adm.handlebars", video: video })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para o Video" + erro)
        res.redirect("/dashboard/")
    })

})

router.post("/update-home-video", eAdmin, (req, res) => {

    var dados_home_video = req.body
    var errors = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo" })
    }

    if (!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo subtitulo" })
    }

    if (!req.body.urlvideo || typeof req.body.urlvideo == undefined || req.body.urlvideo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo do embed do video" })
    }


    if (errors.length > 0) {
        res.render("home/edit-home-video", { layout: "adm.handlebars", errors: errors, video: dados_home_video })
    } else {
        Video.findOne({ _id: req.body._id }).then((video) => {
            video.titulo = req.body.titulo,
                video.subtitulo = req.body.subtitulo,
                video.urlvideo = req.body.urlvideo


            video.save().then(() => {
                req.flash("success_msg", "O Conteudo do Video da pagina inicial foi editado com sucesso")
                res.redirect("/vis-home-video")
            }).catch((erro) => {
                req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para a pagina de Video! " + erro)
                res.redirect("/dashboard/")
            })

        }).catch((erro) => {
            req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para o video da pagina inicial! " + erro)
            res.redirect("/dashboard/")
        })
    }
})

const storegeVideo = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/images/video_home")
    },
    filename: function (req, res, cb) {
        cb(null, "fundo-video.jpg")
    }
})

const uploadVideo = multer({
    storage: storegeVideo,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

router.get("/edit-home-video-img", eAdmin, (req, res) => {
    res.render("home/edit-home-video-img", { layout: 'adm.handlebars' })
})

router.post("/update-home-video-img", eAdmin, uploadVideo.single("file"), (req, res, next) => {

    const file = req.file
    if (!file) {
        req.flash("error_msg", "Erro: Selecione uma imagem Jpeg")
        res.redirect("/edit-home-video-img/")
    } else {
        req.flash("success_msg", "Upload realizado com sucesso")
        res.redirect("/vis-home-video")
    }


})

router.get("/vis-home-exp", eAdmin, (req, res) => {
    Experiencia.findOne({}).then((experiencia) => {
        res.render("home/vis-home-exp", { layout: "adm.handlebars", experiencia: experiencia })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para Experiencia " + erro)
        res.redirect("/dashboard/")
    })
})

router.get("/edit-home-exp", eAdmin, (req, res) => {
    Experiencia.findOne({}).then((experiencia) => {
        res.render("home/edit-home-exp", { layout: "adm.handlebars", experiencia: experiencia })
    }).catch((erro) => {
        req.flash("error_msg", "Erro: Não foi encontrado nenhum registro para Experiencia " + erro)
        res.redirect("/dashboard/")
    })
})

router.post("/update-home-exp", eAdmin, (req, res) => {

    var dados_home_experiencia = req.body
    var errors = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo titulo" })
    }

    if (!req.body.subtitulo || typeof req.body.subtitulo == undefined || req.body.subtitulo == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Subtitulo" })
    }

    if (!req.body.tituloexpum || typeof req.body.tituloexpum == undefined || req.body.tituloexpum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Titulo Experiencia 1" })
    }

    if (!req.body.iconeexpum || typeof req.body.iconeexpum == undefined || req.body.iconeexpum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone Experiencia 1" })
    }

    if (!req.body.descexpum || typeof req.body.descexpum == undefined || req.body.descexpum == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição Experiencia 1" })
    }

    if (!req.body.tituloexpdois || typeof req.body.tituloexpdois == undefined || req.body.tituloexpdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Titulo Experiencia 2" })
    }

    if (!req.body.iconeexpdois || typeof req.body.iconeexpdois == undefined || req.body.iconeexpdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone Experiencia 2" })
    }

    if (!req.body.descexpdois || typeof req.body.descexpdois == undefined || req.body.descexpdois == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição Experiencia 2" })
    }

    if (!req.body.tituloexptres || typeof req.body.tituloexptres == undefined || req.body.tituloexptres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Titulo Experiencia 3" })
    }

    if (!req.body.iconeexptres || typeof req.body.iconeexptres == undefined || req.body.iconeexptres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Icone Experiencia 2" })
    }

    if (!req.body.descexptres || typeof req.body.descexptres == undefined || req.body.descexptres == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Descrição Experiencia 2" })
    }

    if (!req.body.titulobtn || typeof req.body.titulobtn == undefined || req.body.titulobtn == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Titulo do Botão" })
    }

    if (!req.body.urlbtn || typeof req.body.urlbtn == undefined || req.body.urlbtn == null) {
        erros.push({ error: "Erro: Necessário preencher o campo Link do Botão" })
    }

    if (errors.length > 0) {
        res.render("home/edit-home-exp", { layout: "adm.handlebars", errors: errors, experiencia: dados_home_experiencia })
    } else {

        Experiencia.findOne({ _id: req.body._id }).then((experiencia) => {

            experiencia.titulo = req.body.titulo,
                experiencia.subtitulo = req.body.subtitulo,
                experiencia.tituloexpum = req.body.tituloexpum,
                experiencia.iconeexpum = req.body.iconeexpum,
                experiencia.descexpum = req.body.descexpum,
                experiencia.tituloexpdois = req.body.tituloexpdois,
                experiencia.iconeexpdois = req.body.iconeexpdois,
                experiencia.descexpdois = req.body.descexpdois,
                experiencia.tituloexptres = req.body.tituloexptres,
                experiencia.iconeexptres = req.body.iconeexptres,
                experiencia.descexptres = req.body.descexptres,
                experiencia.titulobtn = req.body.titulobtn,
                experiencia.urlbtn = req.body.urlbtn

            experiencia.save().then(() => {
                req.flash("success_msg", "O Conteudo da experiencia salvo com sucesso")
                res.redirect("/vis-home-exp")
            }).catch((erro) => {
                req.flash("error_msg", "Erro: O Conteudo da pagina experiencia não foi editado com sucesso! " + erro)
                res.redirect("/dashboard/")
            })
        }).catch((erro) => {
            req.flash("error_msg", "Erro: Não foi localizado nenhum registro de Experiencia Conteudo da pagina experiencia não foi editado com sucesso! " + erro)
            res.redirect("/dashboard/")
        })
    }



})


module.exports = router