import express from "express";
import connectarDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const connection = await connectarDatabase();

connection.on("error", (erro) => {
    console.error("[Erro de conexão]", erro);
});

connection.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js Express");
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});

    res.status(200).json(listaLivros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);

    if(index === -1)
        res.status(404).send();
    else
        res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json(req.body);
});

app.put("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);

    if(index === -1)
        res.status(404).send();
    else {
        livros[index].titulo = req.body.titulo;
        res.status(204).send();
    }
});

app.delete("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);

    if(index === -1)
        res.status(404).send();
    else {
        livros.splice(index, 1);
        res.status(204).send();
    }
});

export default app;
