require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');

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

app.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'Username and password required.');
  }

  const sql = `
    select "userId",
           "hashedPassword"
    from "users"
    where "username" = $1
    `;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      if (result.rows[0] === undefined) {
        throw new ClientError(401, 'invalid login');
      }

      argon2.verify(result.rows[0].hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            userId: result.rows[0].userId,
            username
          };

          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({
            token,
            user: payload
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/api/reviews/:malId', (req, res, next) => {
  const { malId } = req.params;
  if (!malId) {
    throw new ClientError(400, 'malId is a required field.');
  }
  const sql = `
    select "reviews"."malId",
           "reviews"."reviewId",
           "reviews"."reviewText",
           "users"."fullName"
    from "reviews"
    join "users" using ("userId")
    where "reviews"."malId" = $1
    `;

  const params = [malId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/saved', (req, res, next) => {
  const { userId } = req.user;
  const { malId, animeTitle, imageURL } = req.body;
  if (!malId || !animeTitle || !imageURL) {
    throw new ClientError(400, 'malId, animeTitle and imageURL are required fields');
  }
  const sql = `
    insert into "saved" ("userId", "malId", "animeTitle", "imageURL")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [userId, malId, animeTitle, imageURL];
  db.query(sql, params)
    .then(result => {
      const [savedAnime] = result.rows;
      res.status(201).json(savedAnime);
    })
    .catch(err => next(err));
});

app.get('/api/saved', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "saved"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/reviews', (req, res, next) => {
  const { userId } = req.user;
  const { malId, reviewText } = req.body;
  if (!malId || !reviewText) {
    throw new ClientError(400, 'malId, animeTitle and imageURL are required fields');
  }
  const sql = `
    insert into "reviews" ("userId", "malId", "reviewText")
    values ($1, $2, $3)
    returning *
  `;
  const params = [userId, malId, reviewText];
  db.query(sql, params)
    .then(result => {
      const [savedAnime] = result.rows;
      res.status(201).json(savedAnime);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\napp listening on port ${process.env.PORT}\n`);
});
