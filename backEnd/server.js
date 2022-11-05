const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger/logger');
const connectDB = require('./config/db');
const server = express();

//Load env vars
dotenv.config({ path: './config/configs.env' });

//Connect to database
connectDB();

//Load Routes files
const index = require('./routes/index');

const PORT = process.env.DB_SERVER_PORT;

//Mount routers
server.use(logger);
server.use('/', index);

server.listen(PORT, console.log(`Server running in ${PORT}`));
