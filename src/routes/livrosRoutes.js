import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get ("/livros", LivroController.listarLivros, paginar)
  .get ("/livros/busca", LivroController.listarLivrosPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .get("/busca", LivroController.listarLivrosPorFiltro, paginar)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;

