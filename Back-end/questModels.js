const { Pool } = require('pg');

const PG_URI = 'postgres://dnhwoqks:UlyZFeC_gK7t-0sYy8hSA4u080b1ffj7@fanny.db.elephantsql.com/dnhwoqks'; // here we paste the url from the elephantSQL site, JLong is posting it from his
/*
**
** WE STILL NEED TO CREATE A TABLE FOR THE PGSQL DATABASE
**
*/
//boilerplate code to connect the database to our server
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text,params,callback);
    }
};

/*

CREATE TABLE emails (
   email VARCHAR(50) PRIMARY KEY,
   vegetables BOOLEAN,
   protein BOOLEAN,
   dairy BOOLEAN,
   fruit BOOLEAN
);

*/