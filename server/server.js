const express = require('express');
const path = require('path');
const FeatureFlags = require('fflag-ms');

const {
  RAPID_API_KEY: rapidAPIKey,
  FFLAG_NAMESPACE: namespace,
  SERVER_PORT: serverPort
} = process.env;

const ff = new FeatureFlags({
  rapidAPIKey,
  namespace,
  refreshIntervalMS: 300000 // Run every 5 mins.
});

const app = express();

// Trigger maintenance mode if enabled.
app.use((req, res, next) => {
  if (ff.get('isMaintenanceMode', false)) {
    res.status(200).send('Maintenance mode, please try again later.');
    return;
  }

  next();
});

app.use('/', express.static('./dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(serverPort);