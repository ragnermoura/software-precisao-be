const express = require('express');
const app = express();
const morgan = require('morgan');
const rotaPlanos = require('./routes/planos')
const rotaUsuarios = require('./routes/usuarios')
const cors = require('cors')
const helmet = require('helmet')
const conn = require('./db/conn')
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use(express.static('public'))

app.use('/planos', rotaPlanos);
app.use('/usuarios', rotaUsuarios);

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});


conn.sync().then(() => {
    app.listen(port, () =>
      console.log(
        `Server iniciado em: https:${port} or http://localhost:${port}
        `
      )
    )}).catch((err) => console.log(err));
    