const express = require('express');
const notesRouter = require('./notes');

const app = express();
app.use('/notes', notesRouter);
// app.use(express.static('public'));

module.exports = app;