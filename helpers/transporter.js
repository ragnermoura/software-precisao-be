const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@softwareprecisao.com.br',
        pass: 'precisao_mXM8&Tr'
    },

});


module.exports = transporter