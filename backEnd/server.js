const express = require('express');
const dotenv = require('dotenv');
const server = express();

//Load en vars
dotenv.config({ path: './config/configs.env' });

const PORT = process.env.PORT || 5000;
console.log(PORT);

server.listen(PORT, console.log(`Server running in ${PORT}`));
