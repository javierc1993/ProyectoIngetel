const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const AppRoute = require('./app/routes/app.route');
const AuthRoute = require('./app/routes/auth.route');
const ProductionRoute = require('./app/routes/production.route');
const ReleaseRoute = require('./app/routes/release.route');
const SyncroRoute = require('./app/routes/syncro.route');
const InvoiceRoute = require('./app/routes/invoice.route');
const PayRoute = require('./app/routes/pay.route');

const { sequelize } = require('./app/models');


const app = express();

//define global data
process.env.NODE_PATH = path.resolve(__dirname);


//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:4200'] }))


//Routes
app.use('/api/v1/pay/', PayRoute);
app.use('/api/v1/invoice/', InvoiceRoute);
app.use('/api/v1/syncro/', SyncroRoute);
app.use('/api/v1/release/', ReleaseRoute);
app.use('/api/v1/production/', ProductionRoute);
app.use('/api/v1/auth/', AuthRoute);
app.use('/api/v1/', AppRoute);

app.listen(app.get('port'), async () => {
  console.log('Server on port', app.get('port'));
  try {
    await sequelize.sync({ force: false });
    console.log('Connection db OK');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error(error);
  }
});