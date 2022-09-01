
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppRoute = require('./app/routes/app.route');
const AuthRoute = require('./app/routes/auth.route');

const { connection } = require('./app/db/db')


const app = express();




//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:4200'] }))


//Routes
app.use('/api/v1/auth/', AuthRoute);
app.use('/api/v1/', AppRoute);


app.listen(app.get('port'), async () => {
  console.log('Server on port', app.get('port'));
  try {
    await connection.sync({ force: true });
    console.log('Connection db OK');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error(error);
  }
});