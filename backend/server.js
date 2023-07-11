const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use((req, res, next) => {
    // Configurar cabeçalhos de resposta para permitir solicitações de qualquer origem
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Passar para o próximo middleware
    next();
})

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'app',
    port: 5432,
});

app.get('/login', async (req, res) => {
    try {
        const query = 'SELECT * FROM Users WHERE login = $1 and password = md5($2)';
        const query2 = 'SELECT registrar_log_por_usuario($1);';
        const username = req.query.username
        const password = req.query.password
        const result = await pool.query(query, [username, password]);

        await pool.query(query2, [username]);

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
        return null
    }
})

app.get('/users', async (req, res) => {
    try {
        const query = 'SELECT * FROM Users';
        const result = await pool.query(query);

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

app.get('/pilotos', async (req, res) => {
    try {
        const query = 'SELECT * FROM Driver';
        const result = await pool.query(query);

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

app.get('/log', async (req, res) => {
    try {
        const query = 'SELECT * FROM LogTable';
        const result = await pool.query(query);

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Rota para obter quantidade de pilotos, escuderias, corridas e temporadas
app.get('path_da_rota', async (req, res) => { // TODO - adicionar path da rota
    try {

        const username = req.query.username

        const query = "SELECT FROM obter_quantidades($1);"
        const result = await pool.query(query, [username])

        res.status(200).json(result.rows)

    } catch(error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({error: 'Erro ao obter dados do banco de dados'});
    }
})

// Rota para obter quantidade de vitórias e pilotos de uma escuderia, além do primeiro e último ano
app.get('path_da_rota', async (req, res) => { // TODO - adicionar path da rota
    try {

        const constructor = req.query.constructor

        const query = "SELECT FROM obter_informacoes_escuderia($1);"
        const result = await pool.query(query, [constructor])

        res.status(200).json(result.rows)

    } catch(error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({error: 'Erro ao obter dados do banco de dados'});
    }
})

// Rota para obter informações do piloto, como quantidade de vitórias, primeiro e último ano
app.get('path_da_rota', async (req, res) => { // TODO - adicionar path da rota
    try {

        const driver = req.query.driver

        const query = "SELECT FROM obter_informacoes_piloto($1);"
        const result = await pool.query(query, [driver])

        res.status(200).json(result.rows)

    } catch(error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({error: 'Erro ao obter dados do banco de dados'});
    }
})

// Rota para inserção de pilotos
app.post('path_da_rota', async (req, res) => { // TODO - adicionar path da rota
    try {

        const driverref = req.query.driverref
        const number = req.query.number
        const code = req.query.code
        const forename = req.query.forename
        const surname = req.query.surname
        const dob = req.query.dob
        const nationality = req.query.nationality

        const query = "INSERT INTO DRIVER (driverref, 'number', code, forename, surname, dob, nationality) VALUES ($1, $2, $3, $4, $5, $6, $7);"
        const result = await pool.query(query, [driverref, number, code, forename, surname, dob, nationality])

        res.status(200).json(result.rows)

    } catch(error) {
        console.error('Erro ao inserir dados no banco de dados', error);
        res.status(500).json({error: 'Erro ao inserir dados no banco de dados'});
    }
})

// Rota para inserção de construtores
app.post('path_da_rota', async (req, res) => { // TODO - adicionar path da rota
    try {

        const constructorref = req.query.constructorref
        const name = req.query.name
        const nationality = req.query.nationality
        const url = req.query.url

        const query = "INSERT INTO CONSTRUCTORS(constructorref, name, nationality, url) VALUES ($1, $2, $3, $4);"
        const result = await pool.query(query, [constructorref, name, nationality, url])

        res.status(200).json(result.rows)

    } catch(error) {
        console.error('Erro ao inserir dados no banco de dados', error);
        res.status(500).json({error: 'Erro ao inserir dados no banco de dados'});
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