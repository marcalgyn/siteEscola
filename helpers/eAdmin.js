module.exports = {
    eAdmin: function(req, res, next){
        if (req.isAuthenticated()){
            return next()
        }else{
            req.flash("error_msg", "Necessário realizar o login para acessar esta pagina!");
            res.redirect("/usuario/login")

        }
    }
}