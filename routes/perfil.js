require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
require("dotenv").config();

const nivelController = require('../controllers/nivelController');

router.get("/", nivelController.getNivel); 
router.get("/:id_user", nivelController.getNivelId); 
router.delete("/delete", nivelController.deleteNivel),
router.patch("/delete", nivelController.patchNivel),
router.post('/cadastro', nivelController.postNivel);

module.exports = router;