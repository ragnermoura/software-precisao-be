const express = require('express');
require('dotenv').config();
const app = express()
const conn = require('./data/conn');
const routes = require('./routes/index.routes');
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('./public'))

app.get('/api/security', (req, res) => {
    res.status(200).json({message: 'ok'}
    )
})

app.use('/api',routes)

const port = process.env.PORT || 3000

conn.sync().then( () => {
    mongoose.connect(`mongodb+srv://vitormouracs:${process.env.MONGO_PASSWORD}@precisao.mdwvmkh.mongodb.net/?retryWrites=true&w=majority` ,{
        
    }).then(() => {
        console.log('Tô conectado com o Mongo')
    }).catch((erro) => {
        console.log('Não consegui me conectar com o Mongo' + erro)
    });

    app.listen(port, () => {
        console.log(`Server iniciado em http://localhost:${port}`)
    })

}).catch((err) => console.error(err));