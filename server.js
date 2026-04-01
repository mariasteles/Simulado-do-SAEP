const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gerenciamento_tarefas'
});

db.connect();

    "Criar usuário"
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.send('Preencha todos os campos');
    }

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], () => {
        res.send('Usuário cadastrado com sucesso');
    });
});

    "Listar usuários"
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        res.json(result);
    });
});

    "Criar tarefa"
app.post('/tarefas', (req, res) => {
    const { id_usuario, descricao, setor, prioridade } = req.body;

    const sql = `
    INSERT INTO tarefas (id_usuario, descricao, setor, prioridade)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_usuario, descricao, setor, prioridade], () => {
        res.send('Tarefa criada');
    });
});

    "Listar tarefas"
app.get('/tarefas', (req, res) => {
    db.query(`
        SELECT tarefas.*, usuarios.nome AS usuario
        FROM tarefas
        JOIN usuarios ON usuarios.id = tarefas.id_usuario
    `, (err, result) => {
        res.json(result);
    });
});

    "Alterar status"
app.put('/tarefas/:id', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    db.query('UPDATE tarefas SET status = ? WHERE id = ?', [status, id], () => {
        res.send('Atualizado');
    });
});

    "Excluir tarefa"
app.delete('/tarefas/:id', (req, res) => {
    db.query('DELETE FROM tarefas WHERE id = ?', [req.params.id], () => {
        res.send('Excluído');
    });
});

app.listen(3000, () => console.log('Rodando...'));