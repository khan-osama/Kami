require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const path = require('path');
  const publicPath = path.join(__dirname, 'public');
  app.use(require('./dev-middleware')(publicPath));
}

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\napp listening on port ${process.env.PORT}\n`);
});
