const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '91.108.113.155',
    database: 'postgres',
    port: 5432,
})

const getCurrentDateTime = require('./dateUtils');

const checkUser = (request, response) => {

    console.log(getCurrentDateTime());
    console.log(`checking if ${request.query.username} or ${request.query.email} exists...`)

    const {username, email} = request.query;
    const query = 'SELECT * FROM accounts WHERE username = $1 OR email = $2';

    pool.query(query, [username, email], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while checking the user'});
        } else {
            if (results.rows.length > 0) {
                console.log("already exists\n\n")
                response.status(200).json({exists: true});
            } else {
                console.log("does not exist\n\n")
                response.status(200).json({exists: false});
            }
        }
    });
}

const addUser = (request, response) => {

    console.log(getCurrentDateTime());
    console.log(`adding user ${request.body.username}...`)

    const {username, email, fullName, password} = request.body;
    const query = 'INSERT INTO accounts (username, email, full_name, password) VALUES ($1, $2, $3, $4)';

    pool.query(query, [username, email, fullName, password], (error, results) => {
        if (error) {
            console.log("error while adding user")
            console.log(error + "\n\n")
            response.status(500).json({error: 'An error occurred while checking the user'});
        } else {
            console.log(`user ${username} added\n\n`)
            response.status(201).json({sucess: `User added`});
        }
    });
}

const loginUser = (request, response) => {
    const query = `SELECT * FROM accounts WHERE username = '${request.body.username}'`;

    console.log(getCurrentDateTime());
    console.log(`user ${request.body.username} is trying to log in...`)

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while logging in the user'});
        } else {
            if (results.rows.length > 0) {
                if (results.rows[0].password === request.body.password) {
                    console.log("login successful\n\n")
                    response.status(200).json({success: true, uuid: results.rows[0].uuid});
                } else {
                    console.log("invalid password\n\n")
                    response.status(401).json({success: false});
                }
            } else {
                console.log("user not found\n\n")
                response.status(404).json({success: false});
            }
        }
    });
}

const toggleLike = (request, response) => {
    const { userUUID, publicationUUID } = request.body;

    console.log(getCurrentDateTime());
    console.log(`user ${userUUID} is trying to like/unlike publication ${publicationUUID}...`)

    const checkQuery = 'SELECT * FROM publication_likes WHERE user_id = $1 AND publication_id = $2';
    const deleteQuery = 'DELETE FROM publication_likes WHERE user_id = $1 AND publication_id = $2';
    const insertQuery = 'INSERT INTO publication_likes (publication_id, user_id) VALUES ($2, $1)';

    pool.query(checkQuery, [userUUID, publicationUUID], (error, results) => {
        if (error) {
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while checking the like'});
        } else {
            if (results.rows.length > 0) {
                console.log("like exists, deleting it...")
                pool.query(deleteQuery, [userUUID, publicationUUID], (error, results) => {
                    if (error) {
                        console.log("error while deleting like")
                        console.log(error + "\n\n");
                        response.status(500).json({error: 'An error occurred while deleting the like'});
                    } else {
                        console.log("like deleted\n\n")
                        response.status(200).json({success: true, message: 'Like deleted'});
                    }
                });
            } else {
                console.log("like does not exist, adding it...")
                pool.query(insertQuery, [userUUID, publicationUUID], (error, results) => {
                    if (error) {
                        console.log("error while adding like")
                        console.log(error + "\n\n");
                        response.status(500).json({error: 'An error occurred while adding the like'});
                    } else {
                        console.log("like added\n\n")
                        response.status(200).json({success: true, message: 'Like added'});
                    }
                });
            }
        }
    });
}

const userLikedPublication = (request, response) => {
    const { userId, publicationId } = request.body;

    console.log(getCurrentDateTime());
    console.log(`checking if user ${userId} liked publication ${publicationId}...`)

    const checkQuery = 'SELECT * FROM publication_likes WHERE user_id = $1 AND publication_id = $2';

    pool.query(checkQuery, [userId, publicationId], (error, results) => {
        if (error) {
            console.log("error while checking like")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while checking the like'});
        } else {
            if (results.rows.length > 0) {
                console.log("user liked publication\n\n")
                response.status(200).json({liked: true});
            } else {
                console.log("user did not like publication\n\n")
                response.status(200).json({liked: false});
            }
        }
    });
}

const getUserById = (request, response) => {

    console.log(getCurrentDateTime());
    console.log(`getting user ${request.params.uuid}...`)

    const uuid = request.params.uuid;
    const query = 'SELECT * FROM accounts WHERE uuid = $1';

    pool.query(query, [uuid], (error, results) => {
        if (error) {
            console.log("error while getting user")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while getting the user'});
        } else {
            if (results.rows.length > 0) {
                console.log(`user ${results.rows[0].username} retrieved\n\n`)
                response.status(200).json(results.rows[0]);
            } else {
                console.log("user not found\n\n")
                response.status(404).json({error: 'User not found'});
            }
        }
    });
}

module.exports = {
    checkUser,
    addUser,
    loginUser,
    toggleLike,
    userLikedPublication,
    getUserById,
}