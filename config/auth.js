const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

module.exports = function (passport) {
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: 'senha'
    }, (email, senha, done) => {
        Usuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Cadastro com esses dados não encontrado" })
            } 
  
            bcryptjs.compare(senha, usuario.senha, (erro, correta) => {
                if (correta) {

                    if (usuario.estatus == false) {
                        console.log("Usuario aguardando liberação: " + usuario.nome);
            //            return done(null, false, {message: "Usuário aguardando liberação de acesso. " + usuario.nome})
                    } else {
                        console.log("Usuario Logado com sucesso: " + usuario.nome);
             //           return done(null, usuario)
                    }
                } else {
                    console.log(usuario);
           //         return done(null, false, { message: "Dados de acesso incorreto." })
                }
            })
            return done(null, usuario)
           

        })

    }))

    //Salva os dados do usuario na sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (erro, usuario) => {
            done(erro, usuario)
        })
    })

}

