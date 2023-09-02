const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')
const sequelize = require('./util/database');

const userRoutes = require('./routes/user');

var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/user', userRoutes);

app.use(errorController.get404);

sequelize.sync()
.then(()=>{
  app.listen(3000 ,()=>{
    console.log('server is listening')
  })
})
.catch(err=>{
    console.log(err);
})

  