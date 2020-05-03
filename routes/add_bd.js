//Carregar os modulos
const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

const bcryptjs = require("bcryptjs")

router.get("/", (req, res) => {
    /*new HomeTopo({
        titulo: "Temos a solução para que sua empresa Precisa!",
        subtitulo: "Este texto e subtitulo hehe hdkhald fflkjhf shf fsaf sd",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato"
    }).save().then(() =>{
        console.log("Topo Cadastrado com sucesso")
    }).catch((erro) =>{
        console.log("Erro ao cadastrar Topo Cadastrado.")
    })
    */

    /*
     new Servico({
     titulo: "SERVIÇOS",
     iconeservum: "fas fa-truck-moving",
     tituloservum: "Serviço Um",
     descservum: "descricao um hhalsdsdfjs fafjalksfaçsfasjfçalsjkfsjafd",
     
     iconeservdois: "fas fa-truck-loading",
     tituloservdois: "Serviço Dois",
     descservdois: "descricao dois hhalsdsdfjs fafjalksfaçsfasjfçalsjkfsjafd",
 
     iconeservtres: "fas fa-boxes",
     tituloservtres: "Serviço tres",
     descservtres: "descricao tres hhalsdsdfjs fafjalksfaçsfasjfçalsjkfsjafd sjdkah akjhlka dsklfhsdlkf hsldkfhlkashdfk",
    */
    /*
   new Video({
       titulo: "Vídeo",
       subtitulo: "Subtitulo do video",
       urlvideo: "<iframe class='embed-responsive-item' src='http://www.youtube.com/embed/ddnWxl2yXeM?rel-0' allowfullscreen></iframe>"
    */
    /*
    new Experiencia({
        titulo: "Somos uma empresa...",
        subtitulo: "Subtitulo jhsdhkjdhlkha ldfkhfhsdflk",
        iconeexpum: "fas fa-route",
        tituloexpum: "EXPERIENCIA",
        descexpum: "Descrição da experiencia um....",
        iconeexpdois: "fas fa-satellite",
        tituloexpdois: "TECNOLOGIA",
        descexpdois: "Descrição da Tecnologia.....",
        iconeexptres: "far fa-handshake",
        tituloexptres: "PROXIMIDADE",
        descexptres: "Descrição da prodimidade...",
        titulobtn: "ENTRE EM CONTATO",
        urlbtn: "http://localhost:8080/contato",
    */
    /*    
    new Rodape({
        titulopg: "Silvio Marçal",
        titulopgum: "Home",
        urlpgum: "http://localhost:8080/home",
        titulopgdois: "Sobre",
        urlpgdois: "http://localhost:8080/sobre",
        titulopgtreis: "Contato",
        urlpgtreis: "http://localhost:8080/contato",
        tituloend: "Contato",
        telefone: "(62) 9 8556-7314",
        endereco: "Rua H-155, Ap. de Goiânia-GO",
        cnpj: "12.123.456./0001-00",
        tituloredsoc: "Rede Sociais",
        titulorsum: "Facebook",
        urlrdum: "http://facebook.com/marcalsilvio",
        titulorsdois: "Instagram",
        urlrddois: "https://www.instagram.com/silvio.marcal",
        titulorstreis: "Linkedin",
        urlrdtreis: "https://www.linkedin.com/in/silvio-mar%C3%A7al-97127b25/",
        titulorsquatro: "Twitter",
        urlrdquatro: "https://twitter.com/",
        */
    /*
   new Sobre({
    titulotop: "Empresa de Transporte",
    subtitulotop: "Descrição Top",
    titulo: "Somos uma empresa...",
    subtitulo: "Subtitulo jhsdhkjdhlkha ldfkhfhsdflk",

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
    urlbtn: "http://localhost:8080/contato",
    */
    /*
    new ContatoInfo ({
     titulo: "Entre em Contato - Empresa",
     subtitulo: "Escolha o canal de atendimento de sua preferencia",
     tituloform: "Solicite mais informação",
     titulohratend:"Fale Conosco",
     hratend: "Segunda a Sexta 08:00 ás 11:30 e 13:00 as 18:00",
     tituloend: "Logradouro",
     logradouro: "Rua H-155",
     bairro: "Cidade Vera Cruz",
     complemento: "Qd 321 Lt 06",
     cidade: "Aparecida de Goiânia",
     uf: "GO",
     telefone: "(62) 98556-7314",
     */

        var senha = "123";
     bcryptjs.genSalt(10, (erro, salt) => {
        bcryptjs.hash(senha, salt, (erro, hash) => {
            if (erro) {
                res.send("Erro ao tentar criptografar a senha")
            } else {
                var senha_cript = hash
                new Usuario({
                    nome: "Silvio Marcal",
                    email: "marcalgyn@hotmail.com",
                    tipoUsuario: 'A',
                    senha: senha_cript
                }).save().then(() => {
                    res.send("Usuario Cadastrado com sucesso")
                }).catch((erro) => {
                    res.send("Erro ao cadastrar Usuario." + erro)
                })

            }


        })
    })


})


module.exports = router