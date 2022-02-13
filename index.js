require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('combined'));

const mainRouter = require('./routes/main');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFound);
app.use(errorHandler);

const start = async() => {
  try{
    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
  }
  catch (error) {
    console.log(error);
  }
}

start();

