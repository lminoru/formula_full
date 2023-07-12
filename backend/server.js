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
    host: 'data-base',
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

app.get('/escuderias', async (req, res) => {
    try {
        const query = 'SELECT * FROM constructors';
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
app.get('/quantidades_geral', async (req, res) => {
    try {

        const username = req.query.username

        const query = "SELECT * FROM obter_quantidades($1);"
        const result = await pool.query(query, [username])

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Rota para obter quantidade de vitórias e pilotos de uma escuderia, além do primeiro e último ano
app.get('/informacoes_escuderia', async (req, res) => {
    try {

        const constructor = req.query.constructor

        const query = "SELECT * FROM obter_informacoes_escuderia($1);"
        const result = await pool.query(query, [constructor])

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Rota para obter informações do piloto, como quantidade de vitórias, primeiro e último ano
app.get('/informacoes_piloto', async (req, res) => {
    try {

        const driver = req.query.driver

        const query = "SELECT * FROM obter_informacoes_piloto($1);"
        const result = await pool.query(query, [driver])

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Rota para verificar se piloto já correu por determinada escuderia
app.get('/piloto_correu_escuderia', async (req, res) => {
    try {

        const constructor = req.query.constructor
        const driver = req.query.driver

        const query = "SELECT * FROM check_existing_pilots($1, $2);"
        const result = await pool.query(query, [constructor, driver])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Rota para inserção de pilotos
app.post('/inserir_piloto', async (req, res) => {
    try {

        const query_id = "SELECT MAX(driverid) FROM Driver;"
        const result_id = await pool.query(query_id)

        const driverid = result_id.rows[0].max + 1
        const driverref = req.query.driverref
        const number = req.query.number
        const code = req.query.code
        const forename = req.query.forename
        const surname = req.query.surname
        const dob = req.query.dob
        const nationality = req.query.nationality

        const query = "INSERT INTO DRIVER (driverid, driverref, number, code, forename, surname, dob, nationality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);"
        const result = await pool.query(query, [driverid, driverref, number, code, forename, surname, dob, nationality])

        res.status(201).json(result.rows)

    } catch (error) {
        console.error('Erro ao inserir dados no banco de dados', error);
        res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
    }
})

// Rota para inserção de construtores
app.post('/inserir_escuderia', async (req, res) => {
    try {

        const query_id = "SELECT MAX(constructorid) FROM Constructors;"
        const result_id = await pool.query(query_id)

        const constructorid = result_id.rows[0].max + 1
        const constructorref = req.query.constructorref
        const name = req.query.name
        const nationality = req.query.nationality
        const url = req.query.url

        const query = "INSERT INTO CONSTRUCTORS(constructorid, constructorref, name, nationality, url) VALUES ($1, $2, $3, $4, $5);"
        const result = await pool.query(query, [constructorid, constructorref, name, nationality, url])

        res.status(201).json(result.rows)

    } catch (error) {
        console.error('Erro ao inserir dados no banco de dados', error);
        res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
    }
})


// relatório 1
// Rota para gerar relatório de estados e da quantidade de estados que ela possui
app.get('/relatorio_estados', async (req, res) => {
    try {

        const query = "SELECT s.Status, COUNT(*) AS Count FROM Results r INNER JOIN Status s ON r.StatusId = s.StatusId GROUP BY s.Status;"
        const result = await pool.query(query)

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// relatório 2
// Rota para gerar relatório de estados e da quantidade de estados que ela possui
app.get('/aeroportos_proximo_cidade', async (req, res) => {
    try {
        const city = req.query.city
        const query = "SELECT * FROM get_airports_by_city_name($1);"
        const result = await pool.query(query, [city])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// relatório 3
// Rota para Listar os pilotos da escuderia, bem como a quantidade de vezes em
// que cada um deles alcan¸cou a primeira posi¸c˜ao em uma corrida
app.get('/pilotos_vitorias_escuderia', async (req, res) => {
    try {
        const constructor = req.query.constructor
        const query = "SELECT * FROM listar_pilotos_vitorias_escuderia($1)"
        const result = await pool.query(query, [constructor])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// relatório 4
// Rota para listar a quantidade de resultados por cada status, apresentando o
// status e sua contagem, limitadas ao escopo de sua escuderia.
app.get('/qtd_resultados_estados', async (req, res) => {
    try {
        const constructor = req.query.constructor
        const query = "SELECT * FROM listar_quantidade_resultados_por_status($1);"
        const result = await pool.query(query, [constructor])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// relatório 5
// Rota para Consultar a quantidade de vitórias obtidas, apresentando o ano e a
// corrida onde cada vitória foi alcançada, limitada ao escopo do piloto logado.
app.get('/vitorias_piloto', async (req, res) => {
    try {
        const driver = req.query.driver
        const query = "SELECT * FROM listar_vitorias_piloto($1);"
        const result = await pool.query(query, [driver])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})


// relatório 6
// Rota para listar a quantidade de resultados por cada status, apresentando o status
// e sua contagem, limitada ao escopo do piloto logado.
app.get('/piloto_resultados_estado', async (req, res) => {
    try {
        const driver = req.query.driver
        const query = "SELECT * FROM listar_resultados_por_status($1);"
        const result = await pool.query(query, [driver])

        res.status(200).json(result.rows)

    } catch (error) {
        console.error('Erro ao obter dados do banco de dados', error);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
    }
})

// Inicialização do servidor
app.listen(8090, () => {
    console.log('Servidor está executando na porta 8090');
});