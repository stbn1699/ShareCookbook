const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
})

const getCurrentDateTime = require('./dateUtils');
const {logInfo, logError} = require("./logger");

const getPublications = (request, response) => {

    let method = `getPublications`

    const query = `
        SELECT publications.*, 
               (SELECT COUNT(*) 
                FROM publication_likes 
                WHERE publication_id = publications.uuid) AS likes_count
        FROM publications
        ORDER BY publication_date DESC`;

    pool.query(query, (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while getting the publications'});
        } else {
            logInfo(method, `done`)
            response.status(200).json(results.rows);
        }
    });
}

const getPublicationById = (request, response) => {

    let method = `getPublicationById`

    const id = request.params.id;
    const query = `
        SELECT publications.*, 
               ARRAY_AGG(publication_likes.user_id) AS likes
        FROM publications
        LEFT JOIN publication_likes ON publications.uuid = publication_likes.publication_id
        WHERE publications.uuid = $1
        GROUP BY publications.uuid`;

    pool.query(query, [id], (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while getting the publication'});
        } else {
            logInfo(method, `done, puibliation : ${results.rows[0].title} retrieved`)
            response.status(200).json(results.rows[0]);
        }
    });
}

const addRecipe = (request, response) => {
    const { title, uuid, time_to_cook, n_personnes, content } = request.body;

    let method = `addRecipe recipe : ${title}`

    const getUsernameQuery = 'SELECT username FROM users WHERE uuid = $1';

    pool.query(getUsernameQuery, [uuid], (error, results) => {
        if (results.rows.length > 0) {
            const author = results.rows[0].username;
            const addRecipeQuery = `
                INSERT INTO publications (title, author, time_to_cook, n_personnes, content, user_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING uuid
            `;

            const params = [title, author, time_to_cook, n_personnes, content, uuid];
            console.log(`Executing query: ${addRecipeQuery} with parameters: ${params}`);

            pool.query(addRecipeQuery, params, (error, results) => {
                if (error) {
                    logError(method, `error : ` + error)
                    response.status(500).json({error: 'An error occurred while adding the recipe'});
                } else {
                    const publicationUuid = results.rows[0].uuid;
                    logInfo(method, `done, publication : ${title} added`)
                    response.status(200).json({success: true, message: 'Recipe added', uuid: publicationUuid});
                }
            });
        } else {
            logError(method, `error : User not found`)
            response.status(404).json({error: 'User not found'});
        }
    });
}

const getCommentsByPublicationId = (request, response) => {
    const publicationUUID = request.params.uuid;

    let method = `getCommentsByPublicationId publication : ${publicationUUID}`

    const query = `
        SELECT comments.date_publication, comments.contenu, comments.uuid, users.username
        FROM comments
        INNER JOIN users ON comments.id_utilisateur = users.uuid
        WHERE comments.id_publication = $1
        ORDER BY comments.date_publication ASC`;

    pool.query(query, [publicationUUID], (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while getting the comments'});
        } else {
            logInfo(method, `done`)
            response.status(200).json(results.rows);
        }
    });
}

const addComment = (request, response) => {
    const { userUUID, publicationUUID, content } = request.body;

    let method = `addComment publication : ${publicationUUID}`

    const addCommentQuery = `
        INSERT INTO comments (id_utilisateur, id_publication, contenu)
        VALUES ($1, $2, $3)
    `;

    pool.query(addCommentQuery, [userUUID, publicationUUID, content], (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while adding the comment'});
        } else {
            logInfo(method, `done`)
            response.status(200).json({success: true, message: 'Comment added'});
        }
    });

}

const searchRecipes = (request, response) => {
    const searchText = request.params.searchContent;

    let method = `searchRecipes search : ${searchText}`

    const query = `
        SELECT *
        FROM publications
        WHERE title ILIKE $1`;

    pool.query(query, [`%${searchText}%`], (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while searching for recipes'});
        } else {
            logInfo(method, `done`)
            response.status(200).json(results.rows);
        }
    });
}

const getPublicationsByUserId = (request, response) => {
    const userId = request.params.userId;

    let method = `getPublicationsByUserId`

    const query = `
        SELECT *
        FROM publications
        WHERE user_id = $1
        ORDER BY publication_date DESC`;

    pool.query(query, [userId], (error, results) => {
        if (error) {
            logError(method, `error : ` + error)
            response.status(500).json({error: 'An error occurred while getting publications for user'});
        } else {
            logInfo(method, `done`)
            response.status(200).json(results.rows);
        }
    });
}

module.exports = {
    getPublicationsByUserId,
    searchRecipes,
    addComment,
    getPublications,
    getCommentsByPublicationId,
    getPublicationById,
    addRecipe,
}