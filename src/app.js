const express = require('express');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const apiRoutes = require('./app/routes/api');
const adminRoutes = require('./app/routes/web');
const ajaxRoutes = require('./app/routes/ajax');
const errorHandler = require('./utils/errorHandler');
const cors = require('./app/middlewares/cors');
const { enums } = require('./config/constants');

const app = express();
const sessionStore = new MySqlStore({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

global.constants = enums;

app.setMaxListeners(50);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: false, store: sessionStore }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors);
app.use(adminRoutes);
app.use('/ajax', ajaxRoutes);
app.use('/api/v1', apiRoutes);

app.use(errorHandler.invalidEndPoint);

app.use((error, request, response, next) => {
    return response.status(250).json(errorHandler.makeErrorResponse(error));
});


module.exports = app;