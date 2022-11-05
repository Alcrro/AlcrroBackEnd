const server = require('express');

server.get('/', (req, res, next) => {
  res.json({
    success: true,
  });
});

exports.module = server;
