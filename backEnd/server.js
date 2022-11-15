const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./middleware/logger/logger');
const errorHandler = require('./middleware/error/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/configs.env' });

//Connect to database
connectDB();

//Load Routes files
const index = require('./routes/index/index');
const user = require('./routes/user/User');
const auth = require('./routes/auth/auth');
const group = require('./routes/group/group');

const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.DB_SERVER_PORT;

server.use('/', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'Content-type');
  await next();
});

//Mount routers
server.use(logger);
server.use('/api/auth', auth);
server.use('/', index);
server.use('/api/user', user);
server.use('/api/group', group);
server.use(errorHandler);

server.listen(PORT, console.log(`Server running in ${PORT}`));
