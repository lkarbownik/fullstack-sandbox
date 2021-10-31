const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const db = require('./models');
const todoListRouter = require('./routes/todo-list');
const todoRouter = require('./routes/todo');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const PORT = 3001;

app.use('/todo-list', todoListRouter);
app.use('/todo', todoRouter);

const errorHandler = (err, _, res, next) => {
    console.error(err);
    res.status(500);
    res.end();

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
