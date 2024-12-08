import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController{

    static async getAll(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - falha na requisição` });
        }
    }

    static async getById(req, res){
        try {
            const result = await livro.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500)
                .json({ message: `[Falha ao buscar livro] ${error.message}`})
        }
    }

    static async post(req, res){
        const body = req.body;

        try {
            const entityAutor = await autor.findById(body.autor);
            const entity = {
                ...body,
                autor: { ...entityAutor._doc }
            };

            const novoLivro = await livro.create(entity);
            res.status(201).json(novoLivro);
        } catch (error) {
            res.status(500)
                .json({ message: `${error.message} - falha ao cadastrar livro` });
        }
    }

    static async put(req, res){
        try {
            const result = await livro.findByIdAndUpdate(req.params.id, req.body);
            res.status(204).send();
        } catch (error) {
            res.status(500)
                .json({ message: `[Falha ao atualizar o livro] ${error.message}`})
        }
    }

    static async delete(req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500)
                .json({ message: `[Falha ao deletar o livro] ${error.message}`})
        }
    }
};

export default LivroController;