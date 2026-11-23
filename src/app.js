const express = require('express');
const routes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const usersRoute = require('./routes/user.routes');
const authRout = require('./routes/auth.router')
const categoriesRouter = require('./routes/categories.router');
const eventRouter = require('./routes/event.route');
const permissionRout = require('./routes/permission.route');
const ticketRoute = require('./routes/ticket.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRout);
app.use('/api/categories',categoriesRouter);
app.use('/api/events',eventRouter);
app.use('/api/permission',permissionRout);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
