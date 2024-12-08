import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "O Senhor dos Aneis"
    },
    {
        id: 2,
        titulo: "Chapeuzinho vermelho"
    }
];

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js Express");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json(req.body);
});

export default app;