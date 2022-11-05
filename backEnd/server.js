const express = require('express');
const server = express();

server.get('/', (req, res, next) => {
  res.json({
    success: true,
  });
});

server.listen(5000);
