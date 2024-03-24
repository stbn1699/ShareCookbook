const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '91.108.113.155',
    database: 'postgres',
    port: 5432,
})

const getPublications = (request, response) => {

    console.log(new Date());
    console.log(`getting all publications...`)

    const query = `
        SELECT publications.*, 
               (SELECT COUNT(*) 
                FROM publication_likes 
                WHERE publication_id = publications.uuid) AS likes_count
        FROM publications`;

    pool.query(query, (error, results) => {
        if (error) {
            console.log("error while getting publications")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while getting the publications'});
        } else {
            console.log("publications retrieved\n\n")
            response.status(200).json(results.rows);
        }
    });
}

const getPublicationById = (request, response) => {

    console.log(new Date());
    console.log(`getting publication ${request.params.id}...`)

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
            console.log("error while getting publication")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while getting the publication'});
        } else {
            console.log(`publication ${results.rows[0].title} retrieved\n\n`)
            response.status(200).json(results.rows[0]);
        }
    });
}

const addRecipe = (request, response) => {
    const { title, uuid, info_1, info_2, content } = request.body;

    console.log(new Date());
    console.log(`adding recipe ${title}...`)

    const getUsernameQuery = 'SELECT username FROM accounts WHERE uuid = $1';

    pool.query(getUsernameQuery, [uuid], (error, results) => {
        if (results.rows.length > 0) {
            const author = results.rows[0].username;

            console.log(`user found : ${author}\n`)

            const addRecipeQuery = `
                INSERT INTO publications (title, author, info_1, info_2, content)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING uuid
            `;

            pool.query(addRecipeQuery, [title, author, info_1, info_2, content], (error, results) => {
                if (error) {
                    console.log("error while adding recipe")
                    console.log(error + "\n\n");
                    response.status(500).json({error: 'An error occurred while adding the recipe'});
                } else {
                    const publicationUuid = results.rows[0].uuid;
                    console.log(`recipe : ${results.rows[0].title}\n added by ${results.rows[0].author}\n\n`);
                    response.status(200).json({success: true, message: 'Recipe added', uuid: publicationUuid});
                }
            });
        } else {
            console.log("user not found\n\n")
            response.status(404).json({error: 'User not found'});
        }
    });
}

const getCommentsByPublicationId = (request, response) => {
    const publicationUUID = request.params.uuid;

    console.log(new Date());
    console.log(`getting comments for publication ${publicationUUID}...`)

    const query = `
        SELECT commentaires.date_publication, commentaires.contenu, commentaires.id_commentaire, accounts.username
        FROM commentaires
        INNER JOIN accounts ON commentaires.id_utilisateur = accounts.uuid
        WHERE commentaires.id_publication = $1
        ORDER BY commentaires.date_publication ASC`;

    pool.query(query, [publicationUUID], (error, results) => {
        if (error) {
            console.log("error while getting comments")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while getting the comments'});
        } else {
            console.log("comments retrieved\n\n")
            response.status(200).json(results.rows);
        }
    });
}

const addComment = (request, response) => {
    const { userUUID, publicationUUID, content } = request.body;

    console.log(new Date());
    console.log(`adding comment to publication ${publicationUUID}...`)

    const addCommentQuery = `
        INSERT INTO commentaires (id_utilisateur, id_publication, contenu)
        VALUES ($1, $2, $3)
    `;

    pool.query(addCommentQuery, [userUUID, publicationUUID, content], (error, results) => {
        if (error) {
            console.log("error while adding comment")
            console.log(error + "\n\n");
            response.status(500).json({error: 'An error occurred while adding the comment'});
        } else {
            console.log("comment added\n\n")
            response.status(200).json({success: true, message: 'Comment added'});
        }
    });

}

module.exports = {
    addComment,
    getPublications,
    getCommentsByPublicationId,
    getPublicationById,
    addRecipe,
}