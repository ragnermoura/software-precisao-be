const express = require('express');
const PlanosController = require('../controllers/PlanoController');
const router = express.Router();

router.get('/', PlanosController.GetPlanos)
router.post('/cadastro', PlanosController.CadPlanos)
router.get('/:id_plano', PlanosController.GetPlanosById)
router.patch('/', PlanosController.AtualizaPlano)
router.delete('/', PlanosController.DeletePlano)


/*


router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error }) }
        conn.query(
            'DELETE FROM tb002_plano WHERE id_plano = ?',
            [
                req.body.id_plano
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Plano removido com sucesso',
                    request: {
                        tipo: 'POST',
                        desricao: 'Insere um plano',
                        url: 'http://localhost:3000/planos/'
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
}); */

module.exports = router;