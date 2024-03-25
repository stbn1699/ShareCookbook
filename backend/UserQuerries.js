const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '91.108.113.155',
    database: 'postgres',
    port: 5432,
})

const getCurrentDateTime = require('./dateUtils');
const {logError, logInfo} = require("./logger");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const checkUser = (request, response) => {

    let method = `checkUser`

    const {username, email} = request.query;
    const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';

    pool.query(query, [username, email], (error, results) => {
        if (error) {
            logError(method, `error while checking the user : ` + error)
            response.status(500).json({error: 'An error occurred while checking the user'});
        } else {
            if (results.rows.length > 0) {
                logInfo(method, `user exists`)
                response.status(200).json({exists: true});
            } else {
                logInfo(method, `user does not exist`)
                response.status(200).json({exists: false});
            }
        }
    });
}

const addUser = (request, response) => {

    let method = `addUser`

    const {username, email, fullName, password} = request.body;

    // Hash the password
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            logError(method, `error while hashing the password : ` + err)
            response.status(500).json({error: 'An error occurred while hashing the password'});
        } else {
            const query = 'INSERT INTO users (username, email, full_name, password) VALUES ($1, $2, $3, $4)';

            pool.query(query, [username, email, fullName, hash], (error, results) => {
                if (error) {
                    logError(method, `error while adding the user : ` + error)
                    response.status(500).json({error: 'An error occurred while adding the user'});
                } else {
                    logInfo(method, `user added`)
                    response.status(201).json({sucess: `User added`});
                }
            });
        }
    });
}

const loginUser = (request, response) => {
    const query = `SELECT * FROM users WHERE username = '${request.body.username}'`;

    let method = `loginUser`

    pool.query(query, (error, results) => {
        if (error) {
            logError(method, `error while logging in the user : ` + error)
            response.status(500).json({error: 'An error occurred while logging in the user'});
        } else {
            if (results.rows.length > 0) {
                // Compare the hashed password with the plain text password
                bcrypt.compare(request.body.password, results.rows[0].password, function(err, result) {
                    if (err) {
                        logError(method, `error while comparing the passwords : ` + err)
                        response.status(500).json({error: 'An error occurred while comparing the passwords'});
                    } else {
                        if (result) {
                            logInfo(method, `user logged in`)
                            response.status(200).json({success: true, uuid: results.rows[0].uuid});
                        } else {
                            logError(method, `wrong password`)
                            response.status(401).json({success: false});
                        }
                    }
                });
            } else {
                logError(method, `user not found`)
                response.status(404).json({success: false});
            }
        }
    });
}

const toggleLike = (request, response) => {
    const { userUUID, publicationUUID } = request.body;

    let method = `toggleLike`

    const checkQuery = 'SELECT * FROM publication_likes WHERE user_id = $1 AND publication_id = $2';
    const deleteQuery = 'DELETE FROM publication_likes WHERE user_id = $1 AND publication_id = $2';
    const insertQuery = 'INSERT INTO publication_likes (publication_id, user_id) VALUES ($2, $1)';

    pool.query(checkQuery, [userUUID, publicationUUID], (error, results) => {
        if (error) {
            logError(method, `error while checking like : ` + error)
            response.status(500).json({error: 'An error occurred while checking the like'});
        } else {
            if (results.rows.length > 0) {
                pool.query(deleteQuery, [userUUID, publicationUUID], (error, results) => {
                    if (error) {
                        logError(method, `error while deleting the like : ` + error)
                        response.status(500).json({error: 'An error occurred while deleting the like'});
                    } else {
                        logInfo(method, `like deleted`)
                        response.status(200).json({success: true, message: 'Like deleted'});
                    }
                });
            } else {
                pool.query(insertQuery, [userUUID, publicationUUID], (error, results) => {
                    if (error) {
                        logError(method, `error while adding the like : ` + error)
                        response.status(500).json({error: 'An error occurred while adding the like'});
                    } else {
                        logInfo(method, `like added`)
                        response.status(200).json({success: true, message: 'Like added'});
                    }
                });
            }
        }
    });
}

const userLikedPublication = (request, response) => {
    const { userId, publicationId } = request.body;

    let method = `userLikedPublication`

    const checkQuery = 'SELECT * FROM publication_likes WHERE user_id = $1 AND publication_id = $2';

    pool.query(checkQuery, [userId, publicationId], (error, results) => {
        if (error) {
            logError(method, `error while checking the like : ` + error)
            response.status(500).json({error: 'An error occurred while checking the like'});
        } else {
            if (results.rows.length > 0) {
                logInfo(method, `done, liked`)
                response.status(200).json({liked: true});
            } else {
                logInfo(method, `done, not liked`)
                response.status(200).json({liked: false});
            }
        }
    });
}

const getUserById = (request, response) => {

    let method = `getUserById user : ${request.params.uuid}`

    const uuid = request.params.uuid;
    const query = 'SELECT * FROM users WHERE uuid = $1';

    pool.query(query, [uuid], (error, results) => {
        if (error) {
            logError(method, `error while getting the user : ` + error)
            response.status(500).json({error: 'An error occurred while getting the user'});
        } else {
            if (results.rows.length > 0) {
                logInfo(method, `done`)
                response.status(200).json(results.rows[0]);
            } else {
                logError(method, `user not found`)
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