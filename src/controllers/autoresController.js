import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class autorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      if (autoresResultado.length > 0) {
        res.status(200).send(autoresResultado);
      } else {
        next(new NaoEncontrado("Nenhum autor foi encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId  = async (req, res, next) => {
    try {
      const id =  req.params.id;

      const autoresResultado = await autores.findById(id);

      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      autor = await autor.save();
      res.status(201).send(autor);
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const autorAtualizado = await autores.findByIdAndUpdate(req.params.id, { $set: req.body });
      if (autorAtualizado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const autorExcluido = await autores.findByIdAndDelete(req.params.id);
      if (autorExcluido !== null) {
        res.status(200).send({ message: `Autor com ID: ${req.params.id} excluído com sucesso` });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default autorController;
