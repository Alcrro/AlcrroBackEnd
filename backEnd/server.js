const express = require('express');
const dotenv = require('dotenv');
const server = express();
//Load Routes files
const index = require('./routes/index/index');
//Load env vars
dotenv.config({ path: './config/configs.env' });

const PORT = process.env.DB_SERVER_PORT;

//Mount routers
server.use('/', index);

server.listen(PORT, console.log(`Server running in ${PORT}`));
