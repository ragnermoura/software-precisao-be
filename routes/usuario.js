const express = require('express');
const UserController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/cadastro', UserController.postCadastro)
router.patch('/atualiza', UserController.patchCadastro)
router.post('/delete', UserController.deleteCadastro)

module.exports = router