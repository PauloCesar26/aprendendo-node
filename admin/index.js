const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json()); //permitir que o expresss entenda requisições do formato JSON

//Conectar com DB 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "form_db"
});
db.connect((err) => {
    if(err){
      console.error("Erro ao conectar no banco:", err);
    }
    else{
      console.log("Conectado ao MySQL.");
    }
});

// padrão usado em apps com Node.js + Express + MySQL:
// Criar uma rota POST.
// Pegar os dados do corpo com req.body.
// Montar uma query SQL.
// Executar a query com os dados.
// Enviar resposta ao cliente.
app.post("/enviar", (req, res) => {
    const {nome , email, mensagem} = req.body;
    const sql = "INSERT INTO info (nome, email, mensagem) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, mensagem], (err, result) => {
        if(err){
            console.error("Erro ao inserir:", err);
            return res.status(500).send(err);
        }
        else{
            res.send("Dados enviados com sucesso!");
        }
    });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});