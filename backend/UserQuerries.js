const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
})

const checkUser = (request, response) => {
    console.log("checking user...")

    const {username, email} = request.query;
    const query = 'SELECT * FROM accounts WHERE username = $1 OR email = $2';

    pool.query(query, [username, email], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while checking the user'});
        } else {
            if (results.rows.length > 0) {
                console.log("already exists")
                response.status(200).json({exists: true});
            } else {
                console.log("does not exist")
                response.status(200).json({exists: false});
            }
        }
    });
}

const addUser = (request, response) => {
    const {username, email, fullName, password} = request.body;
    console.log(request.body)
    const query = 'INSERT INTO accounts (username, email, full_name, password_hash) VALUES ($1, $2, $3, $4)';

    pool.query(query, [username, email, fullName, password], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while checking the user'});
        } else {
            response.status(201).json({sucess: `User added`});
        }
    });
}

const loginUser = (request, response) => {
    const query = `SELECT * FROM accounts WHERE username = '${request.body.username}'`;

    console.log("user : ", request.body.username)
    console.log("password : ", request.body.password)
    console.log("querry : ", query)

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while logging in the user'});
        } else {
            if (results.rows.length > 0) {
                if (results.rows[0].password === request.body.password) {
                    console.log("login successful")
                    response.status(200).json({success: true});
                } else {
                    console.log("invalid password")
                    response.status(401).json({success: false});
                }
            } else {
                console.log("user not found")
                response.status(404).json({success: false});
            }
        }
    });
}

module.exports = {
    checkUser,
    addUser,
    loginUser, // add this line
}