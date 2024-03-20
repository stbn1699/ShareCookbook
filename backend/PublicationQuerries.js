const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
})

const getPublications = (request, response) => {
    const query = `
        SELECT publications.*, 
               (SELECT COUNT(*) 
                FROM publication_likes 
                WHERE publication_id = publications.uuid) AS likes_count
        FROM publications`;

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while getting the publications'});
        } else {
            response.status(200).json(results.rows);
        }
    });
}

const getPublicationById = (request, response) => {
    const id = request.params.id;
    const query = `
        SELECT publications.*,
               (SELECT COUNT(*)
                FROM publication_likes
                WHERE publication_id = publications.uuid) AS likes_count
        FROM publications WHERE uuid = $1`;

    pool.query(query, [id], (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json({error: 'An error occurred while getting the publication'});
        } else {
            response.status(200).json(results.rows[0]);
        }
    });
}

module.exports = {
    getPublications,
    getPublicationById,
}