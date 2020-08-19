// Servidor
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses, pageSuccess } = require('./pages')


// Configurar Nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Início e configuração do servidor
server
// Receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) // Tudo que for .use é uma configuração de servidor
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.get("/success", pageSuccess)
// Start do servidor
.listen(5500)