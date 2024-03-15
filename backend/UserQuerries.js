const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
})

const checkUser = (request, response) => {
    const { username, email } = request.query;
    const query = 'SELECT * FROM accounts WHERE username = $1 OR email = $2';

    pool.query(query, [username, email], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).send('An error occurred while checking the user');
        } else {
            if (results.rows.length > 0) {
                response.json({ exists: true });
            } else {
                response.json({ exists: false });
            }
        }
    });
}

const addUser = (request, response) => {
    const { username, email, password_hash, full_name } = request.body;
    console.log(request.body)
    const query = 'INSERT INTO accounts (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4)';

    pool.query(query, [username, email, password_hash, full_name], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).send('An error occurred while adding the user');
        } else {
            response.status(201).send(`User added`);
        }
    });
}

module.exports = {
    checkUser,
    addUser,
}