import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const resultadoLivros = await livros.find().populate("autor");
      if (resultadoLivros.length > 0) {
        res.status(200).send(resultadoLivros);
      } else {
        next(new NaoEncontrado("Nenhum livro foi encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorId = async (req, res, next) => {
    try {
      const livro = await livros.findById(req.params.id).populate("autor", "nome");
      if (livro !== null) {
        res.status(200).send(livro);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
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
      const livroAtualizado = await livros.findByIdAndUpdate(req.params.id, { $set: req.body });
      if (livroAtualizado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const livroExcluido = await livros.findByIdAndDelete(req.params.id);
      if (livroExcluido !== null) {
        res.status(200).send({ message: `Livro com ID: ${req.params.id} excluído com sucesso` });
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    try {
      const livrosPorEditora = await livros.find({ "editora": req.query.editora });
      if (livrosPorEditora.length > 0) {
        res.status(200).send(livrosPorEditora);
      } else {
        next(new NaoEncontrado(`Nenhum livro encontrado para a editora: ${req.query.editora}`));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
