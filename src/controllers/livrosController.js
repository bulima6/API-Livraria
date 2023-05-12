import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
import mongoose from "mongoose";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find().populate("autor", "nome");

      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      livro = await livro.save();
      res.status(201).send(livro);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = req.query;
  
      const busca = {};
  
      if (editora) busca.editora = { $regex: new RegExp(editora), $options: "i" };
      if (titulo) busca.titulo = { $regex: new RegExp(titulo), $options: "i" };
      if (minPaginas) busca.numeroPaginas = { $gte: Number(minPaginas) };
      if (maxPaginas) busca.numeroPaginas = { ...busca.numeroPaginas, $lte: Number(maxPaginas) };
      if (nomeAutor) {
        const autor = await autores.findOne({ nome: { $regex: new RegExp(nomeAutor), $options: "i" } });
        if (!autor) {
          return res.status(404).send({ message: "Autor não encontrado" });
        }
        const autorId = mongoose.Types.ObjectId(autor._id);
        busca.autor = autorId;
      }
  
      const buscaLivros = livros.find(busca);
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
