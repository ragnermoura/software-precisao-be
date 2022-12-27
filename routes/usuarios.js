const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/UserController');

//SMS Service
const accountSid = "ACe8580af80cb800ddc80c1b690394efec";
const authToken = "e1cd64c1a30c475e0bad348f7ae24633";
const client = require("twilio")(accountSid, authToken);


router.get('/', UserController.GetClient);
/* 
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb001_user',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.get('/:id_user', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tb001_user WHERE id_user = ?',
            [req.params.id_user],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});

router.patch('/edit', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tb001_user 
            SET nome_user = ?, 
            email_user = ?, 
            senha_user = ?, 
            telefone_user = ?, 
            id_plano = ?,
            id_nivel = ?,
            WHERE id_user = ?`,
            [
                req.body.nome,
                req.body.email,
                req.body.senha,
                req.body.telefone,
                req.body.plano,
                req.body.nivel,
                req.body.id_user,
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Dados de usuário alterados com sucesso!',
                });
            }
        )
    })
});

router.delete('/delete', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb001_user WHERE id_user = ?',
            [
                req.body.id_user
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(202).send({
                    mensagem: 'Usuário excluido com sucesso!'
                });
            }
        )
    })
});


//ROTAS DE SERVIÇO
router.post('/login', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tb001_user WHERE email_user = ?`;
        conn.query(query, [req.body.email], (error, results, field) => {
            conn.release();

            if (err) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({
                    mensagem: 'Falha na autenticação.'
                })

            }
            bcrypt.compare(req.body.senha, results[0].senha_user, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação.' })

                } if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_user,
                        nome: results[0].nome_user,
                        email: results[0].email_user,
                        telefone: results[0].telefone_user,
                        nivel: results[0].id_nivel
                    }, process.env.JWT_KEY, {
                        expiresIn: "6h"
                    })

                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso!',
                        token: token
                    })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação.' })
            })
        })
    })
}),

    router.post('/cadastro', (req, res, next) => {
        let random = Math.random();
        random = random * 6547 + 1;
        random = Math.trunc(random);

        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: error }) }
            conn.query('SELECT * FROM tb001_user WHERE email_user = ?', [req.body.email], (error, result) => {
                if (err) { return res.status(500).send({ error: error }) }
                if (result.length > 0) {
                    res.status(409).send({
                        mensagem: 'Email já cadastrado, por favor insira um email diferente!'
                    })
                } else {
                    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                        if (errBcrypt) {
                            return res.status(500).send({ error: errBcrypt })
                        }
                        conn.query(
                            'INSERT INTO tb001_user (nome_user, email_user, senha_user, telefone_user, id_plano, id_nivel) VALUES (?,?,?,?,?,?)',
                            [req.body.nome, req.body.email, hash, req.body.telefone, req.body.plano, req.body.nivel],

                            (error, result) => {
                                conn.release();
                                if (error) {
                                    return res.status(500).send({
                                        error: error,
                                    });
                                }

                                const response = {
                                    mensagem: 'Usuário cadastrado com sucesso',
                                    usuarioCriado: {
                                        id_user: result.insertId,
                                        nome: req.body.nome,
                                        email: req.body.email,
                                        telefone: req.body.telefone,

                                        request: {
                                            tipo: 'GET',
                                            descricao: 'Pesquisa um usuário',
                                            url: 'http://localhost:3000/usuarios'
                                        }
                                    }
                                }
                                return res.status(202).send(response);

                            });
                    });
                }
            })


            client.messages
                .create({ body: 'Olá, seu código de verificação é: ' + random, from: "+13608034819", to: req.body.telefone })
                .then(message => console.log(message.sid))

        });

    }),
 */


    module.exports = router;