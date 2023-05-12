import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    
  id: {type: String},
  titulo: {
    type: String, 
    required: [true, "O título do livro é obrigatorio"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O(a) autor(a) é obrigatorio"]
  },
  editora: {
    type: String, 
    required: [true, "O nome da editora é obrigatorio"]
  },
  numeroPaginas: {type: Number}

});

const livros = mongoose.model("livros", livroSchema);

export default livros;

