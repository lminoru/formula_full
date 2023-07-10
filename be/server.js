const express = require('express');
const app = express();
const { Pool } = require('pg');

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: 'pgadm',
    host: 'localhost',
    database: 'formula1',
    password: 'qpwoei',
    port: 5432,
});

app.get('/login', async (req, res) => {

    try {

        const query = 'SELECT * FROM Users WHERE login = $1 and password = md5($2)';
        const username = req.query.username
        const password = req.query.password
        const result = await pool.query(query, [username, password]);

        return result.rows[0].tipo

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
        return null
    }
})

app.get('/teste', async (req, res) => {

    try {

        const query = 'SELECT * FROM Users';
        const result = await pool.query(query);

        res.json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// // Exemplo de rota para obter dados do banco de dados
// app.get('/dados', async (req, res) => {
//     try {
//         const query = 'SELECT * FROM Users WHERE';
//         const result = await pool.query(query);
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Erro ao obter dados do banco de dados', error);
//         res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
//     }
// });

// // Rota para obter um registro específico
// app.get('/dados/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//       const query = 'SELECT * FROM tabela WHERE id = $1';
//       const result = await pool.query(query, [id]);
//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Registro não encontrado' });
//       }
//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Erro ao obter o registro do banco de dados', error);
//       res.status(500).json({ error: 'Erro ao obter o registro do banco de dados' });
//     }
//   });

//   // Rota para criar um novo registro
//   app.post('/dados', async (req, res) => {
//     const { nome, idade } = req.body;
//     try {
//       const query = 'INSERT INTO tabela (nome, idade) VALUES ($1, $2) RETURNING *';
//       const result = await pool.query(query, [nome, idade]);
//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Erro ao criar o registro no banco de dados', error);
//       res.status(500).json({ error: 'Erro ao criar o registro no banco de dados' });
//     }
//   });

// Inicialização do servidor
app.listen(8090, () => {
    console.log('Servidor está executando na porta 8090');
});