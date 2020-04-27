//Carrega os Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bondyParser = require('body-parser')
const app = express()
const home = require("./routes/home")
const materia = require("./routes/materia")
const atividade = require("./routes/atividade")
const listagem = require("./routes/listagem")
const contato = require("./routes/contato")

const usuario = require("./routes/usuario")
const add_bd = require("./routes/add_bd")
const dashboard = require("./routes/dashboard")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")



var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

HandlebarsIntl.registerWith(Handlebars);


//Formatar data
var helpers = require('handlebars-helpers')();





require("./config/auth")(passport)



const path = require("path")

//Configuração
//Sessão
app.use(session({
    secret: 'marcalgyn',
    resave: true,
    saveUninitialized: true    
  }))

//Configurando o passport
app.use(passport.initialize())
app.use(passport.session())


//Flash
app.use(flash())

//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//BodyParser
app.use(bondyParser.urlencoded({extended: false})) 
app.use(bondyParser.json())

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main"}))
app.set("view engine", "handlebars")

//Arquivos Estaticos
// app.use(express.static(path_join(__dirname, "public")))
app.use(express.static("public"))

//Conexao com o Banco de Dados
mongoose.connect('mongodb://localhost/bdteste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Conexao com banco de dados bdteste realizado com sucesso ;) !!")
}).catch((erro) => {
    console.log("Erro Conexao ao banco Celke, NÃO foi realizado com sucesso. " + erro)
})

//Rotas
app.use("/", home)
app.use("/materia", materia)
app.use("/atividade", atividade)
app.use("/listagem", listagem)
app.use("/usuario", usuario)
app.use("/add_bd", add_bd)
app.use("/dashboard", dashboard)
app.use("/contato", contato)




const PORT = 8081
app.listen(PORT, () =>{
    console.log("Servidor iniciado http://localhost:8081")
})