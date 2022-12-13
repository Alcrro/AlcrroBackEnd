const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const logger = require('./backEnd/middleware/logger/logger');
const cookieParser = require('cookie-parser');
const errorHandler = require('./backEnd/middleware/error/error');
const connectDB = require('./backEnd/config/db');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//Load env vars
dotenv.config({ path: './backend/config/configs.env' });

//Connect to database
connectDB();

//Load Routes files
const index = require('./backEnd/routes/index/index');
const user = require('./backEnd/routes/user/User');
const auth = require('./backEnd/routes/auth/auth');
const group = require('./backEnd/routes/group/group');

const server = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
});

//Body parser
server.use(bodyParser.json());
server.use(cookieParser());
server.use(express.json());
server.use(cors());

//Cookie parser
server.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('dev'));
}

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
server.use('/api/users', user);
server.use('/api/group', group);
server.use(errorHandler);

server.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`));
