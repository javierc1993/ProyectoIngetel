
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppRoute = require('./routes/app.route');

const sequelize = require('./db/conection')


const app = express();




//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:4200'] }))


//Routes
app.use('/api/v1/', AppRoute);


app.listen(app.get('port'), async () => {
  console.log('Server on port', app.get('port'));
  try {
    await sequelize.authenticate();
    console.log('Connection db OK');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error(error);
  }
});