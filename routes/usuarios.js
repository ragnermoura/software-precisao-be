const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
require("dotenv").config();

const usuarioController = require('../controllers/usuarioController');

router.get("/", usuarioController.getCadastro); 
router.get("/:id_user", usuarioController.getCadastroId); 
router.delete("/delete", usuarioController.deleteCadastro),
router.patch("/edit", usuarioController.patchCadastro),
router.post('/cadastro', usuarioController.postCadastro);

module.exports = router;
