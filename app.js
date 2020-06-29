const express = require('express');
const app = express();
const clientsRouter = require('./routes/clientsRouter');
const requestRouter = require('./routes/requestRouter');
const adminRouter = require('./routes/adminRouter');
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/request', requestRouter);
app.use('/api/v1/admin',   adminRouter);

module.exports = app;