require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

const jsonMiddleware = express.json();

if (process.env.NODE_ENV === 'development') {
  const path = require('path');
  const publicPath = path.join(__dirname, 'public');
  app.use(require('./dev-middleware')(publicPath));
}
app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/sign-up', (req, res, next) => {
  const { fullName, email, username, password } = req.body;
  if (!username || !password || !fullName || !email) {
    throw new ClientError(400, 'Full name, email, username and password are required fields');
  }

  const sql = `
    insert into "users" ("fullName", "email", "username", "hashedPassword")
    values ($1, $2, $3, $4)
    returning *
    `;

  argon2
    .hash(password)
    .then(hashedPass => {
      const params = [fullName, email, username, hashedPass];
      db.query(sql, params)
        .then(result => {
          const [newUser] = result.rows;
          delete newUser.hashedPassword;
          res.status(201).json(newUser);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\napp listening on port ${process.env.PORT}\n`);
});
