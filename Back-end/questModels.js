const { Pool } = require('pg');

const PG_URI = 'postgres://qqaytbat:0J3bmQY2PAJvZ9ov6bV4YKQVaMCpSYz7@fanny.db.elephantsql.com/qqaytbat'; // url from the elephantSQL site, Travis is posting it from his
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


