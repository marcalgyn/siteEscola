//Carregar os Modulos
const express = require("express")
const router = express.Router()
const passport = require("passport")
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

const bcryptjs = require("bcryptjs")
const multer = require("multer")
const path = require("path")
const fs = require("fs") //file string
const { eAdmin } = require("../helpers/eAdmin")

router.get("/login", (req, res) => {
    res.render("usuario/login", { layout: 'login.handlebars' })
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard/",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req, res) => {

    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/usuario/login")

})

router.get('/cadastro-usuario', eAdmin, (req, res) => {
    let usuario = res.locals.user;
    res.render('usuario/cadastro-usuario', { layout: "adm.handlebars", usuario })
})

router.get('/edit-usuario/:id', eAdmin, (req, res) => {
    let usuarios = res.locals.user;

    Usuario.findById(req.params.id).then((usuario) =>{
        res.render('usuario/cadastro-usuario', { layout: "adm.handlebars", usuarios, usuario })
    })
    
})


router.post("/insert-cad-usuario", eAdmin, (req, res) => {

    var dados_usuario = req.body
    var errors = []


    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Erro: Necessário preencher o Nome do Usuario!" })
    }
    if (errors.length > 0) {
        res.render("usuario/cadastro-usuario", { layout: 'adm.handlebars', errors: errors, usuario: dados_usuario })
    } else {

        bcryptjs.genSalt(10, (erro, salt) => {
            bcryptjs.hash(req.body.senha, salt, (erro, hash) => {
                if (erro) {
                    res.send("Erro ao tentar criptografar a senha")
                } else {
                    if (!req.body._id) {
                        var senha_cript = hash
                        new Usuario({
                            nome: req.body.nome,
                            email: req.body.email,
                            tipoUsuario: req.body.tipoUsuario,
                            senha: senha_cript
                        }).save().then(() => {
                            req.flash("success_msg", "Usuario Cadastrado com sucesso")
                            res.redirect("/usuario/vis-usuario")
                        }).catch((erro) => {
                            req.flash("error_msg", "O Sobre Não foi editado com sucesso")
                            res.redirect("/usuario/edit-usuario")
                        })
                    } else {
                        var senha_cript = hash
                        Usuario.findById(req.body._id).then((usuario) => {
                            usuario.nome = req.body.nome,
                                usuario.email = req.body.email,
                                usuario.senha = senha_cript,
                                usuario.tipoUsuario = req.body.tipoUsuario
                            usuario.save().then(() => {
                                req.flash("success_msg", "Cadastro de usuario editado com sucesso")
                                res.redirect("/usuario/vis-usuario")

                            }).catch((erro) => {
                                req.flash("error_msg", "Não foi encontrado nenhum registro!")
                                res.redirect("/usuario")
                            })
                        })
                    }
                }

            })
        })
    }
})

/* Cadastro via site */

router.post("/signup", (req, res) => {
    const valSenha = req.body.senha;
    const valConfirmSenha = req.body.confirmeSenha;

    if (valSenha !== valConfirmSenha) {
        req.flash("error_msg", "Senhas não conferem!");
        res.redirect("/usuario/signup");
        return;
    }

    const nome = req.body.nome;
    const email = req.body.email;
    //const senha = encryptPassword(req.body.senha);

    bcryptjs.genSalt(10, (erro, salt) => {
        bcryptjs.hash(req.body.senha, salt, (erro, hash) => {
            if (erro) {
                res.send("Erro ao tentar criptografar a senha")
            } else {
                var senha_cript = hash
                new Usuario({
                    nome: nome,
                    email: email,
                    senha: senha_cript,
                    tipoUsuario: 'P'
                }).save().then(() => {
                    req.flash("success_msg", "Usuario Cadastrado com sucesso")
                    res.redirect("/usuario/login")
                }).catch((erro) => {
                    req.flash("error_msg", "O Usuario Não cadastrado com sucesso")
                    res.redirect("/usuario/signup")
                })

            }

        })
    })

})



router.get("/vis-usuario", eAdmin, (req, res) => {
let usuario = res.locals.user;

    const { page = 1 } = req.query
    Usuario.paginate({}, { page, limit: 10 }).then((usuarios) => {
        res.render("usuario/vis-usuario", { layout: 'adm.handlebars', usuarios, usuario })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhum Usuario de contato encontrado!")
        res.redirect("/dashboard/")
    })

})


router.get("/del-usuario/:id", eAdmin, (req, res) => {

    Usuario.count().then((quantidade) => {
        if (quantidade > 1) {
            Usuario.deleteOne({ _id: req.params.id }).then(() => {
                const { page = 1 } = req.query;
                Usuario.paginate({}, { page, limit: 5 }).then((usuario) => {
                    res.render("usuario/vis-usuario", { layout: 'adm.handlebars', usuarios: usuario })

                }).catch((erro) => {
                    req.flash("error_msg", "Error: Nenhum Usuario de contato encontrado!")
                    res.redirect("/dashboard/")
                })
            })
        } else {
            req.flash("error_msg", "Error: Não pode excluir o Ultimo usuario!")
            res.redirect("/dashboard/")
        }

    })


})




router.get("/signup", (req, res) => {
    res.render("usuario/signup", { layout: "login.handlebars" });
});


module.exports = router