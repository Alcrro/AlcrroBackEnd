const express = require('express');
const dotenv = require('dotenv');
const server = express();

//Load env vars
dotenv.config({ path: './config/configs.env' });
const PORT = process.env.DB_SERVER_PORT;

server.listen(PORT, console.log(`Server running in ${PORT}`));
