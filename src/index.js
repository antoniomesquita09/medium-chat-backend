/* eslint-disable no-console */
import config from '~/core/config'; // eslint-disable-line import/order

import mongoose from 'mongoose';
import httpStatus from 'http-status';

// connect to mongo db
mongoose.connection.openUri(config.mongodbUri, {
  autoIndex: true,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.info('Mongoose connected.'));

mongoose.connection.on('error', (err) => {
  throw new APIError(
    `Mongoose connection error: ${err}`,
    httpStatus.INTERNAL_SERVER_ERROR
  );
});

mongoose.connection.on('disconnected', () =>
  console.info('Mongoose disconnected.')
);

// listen on port config.port
app.listen(config.port, () => {
  console.info(`✅ Server started on port ${config.port} (${config.nodeEnv}).`);
});

export default app;