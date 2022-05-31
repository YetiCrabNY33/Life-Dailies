const CREATE_SESSIONS_TABLE = `\
CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

const SELECT_USER = `\
SELECT *
FROM users AS usr
WHERE usr.username = $1
LIMIT 1;`;

const SELECT_SESSION = `\
WITH pre AS (
  SELECT *
  FROM sessions AS ses
  WHERE ses.username = $1
  ORDER BY ses.expires_at DESC
  LIMIT 1;
)
SELECT *
FROM pre
WHERE (ses.expires_at - CURRENT_TIMESTAMP()) != 0;`;

const INSERT_SESSION = `\
INSERT INTO sessions (username)
VALUES ($1)`;

const INSERT_USER = `\
INSERT INTO users (username, salt, pw_hash)
VALUES ($1, $2, $3)
RETURNING *;`;

const UPDATE_SESSION = `\
UPDATE sessions
SET expires_at = $1
WHERE
  username = $2
  AND (expires_at - CURRENT_TIMESTAMP()) != 0;`;

const sessionQueries = Object.freeze({
  createTable: {
    table: CREATE_SESSIONS_TABLE,
  },
  select: {
    user: SELECT_USER,
    session: SELECT_SESSION,
  },
  insert: {
    user: INSERT_USER,
    session: INSERT_SESSION,
  },
  update: {
    session: UPDATE_SESSION,
  },
});

module.exports = sessionQueries;
