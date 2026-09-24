const express = require("express");
const dados = require("./dados.json");

const app = express();
const PORT = 3000;

// Permite receber dados em JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LISTAR TODOS
const listarDados = (req, res) => {
    res.json(dados);
};

// CADASTRAR
const novoCadastro = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Erro ao receber cadastro");
    }

    dados.push(req.body);

    res.status(201).send("Cadastro realizado com sucesso!");
};

// EXCLUIR
const excluirCadastro = (req, res) => {
    const id = req.params.id;

    const indice = dados.findIndex(
        (cadastro) => cadastro.id == id
    );

    if (indice === -1) {
        return res.status(404).send("Cadastro não encontrado");
    }

    dados.splice(indice, 1);

    res.send("Cadastro excluído com sucesso!");
};

// ATUALIZAR
const atualizarCadastro = (req, res) => {
    const id = req.query.id;
    const novosDados = req.body;

    const cadastro = dados.find(
        (cadastro) => cadastro.id == id
    );

    if (!cadastro) {
        return res.status(404).send("Cadastro não encontrado");
    }

    cadastro.sistema = novosDados.sistema;
    cadastro.tipo = novosDados.tipo;
    cadastro.finalidade = novosDados.finalidade;
    cadastro.tecnologia = novosDados.tecnologia;
    cadastro.nivel_risco = novosDados.nivel_risco;
    cadastro.possui_revisao_humana =
        novosDados.possui_revisao_humana;

    res.send("Cadastro atualizado com sucesso!");
};

// ROTAS
app.get("/", listarDados);
app.post("/", novoCadastro);
app.delete("/:id", excluirCadastro);
app.patch("/", atualizarCadastro);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});