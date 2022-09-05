
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const AppRoute = require('./app/routes/app.route');
const AuthRoute = require('./app/routes/auth.route');
const ProductionRoute = require('./app/routes/production.route');

const { sequelize } = require('./app/models');


const app = express();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './filesUploaded')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage })
//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:4200'] }))


//Routes
app.use('/api/v1/production/', ProductionRoute);
app.use('/api/v1/auth/', AuthRoute);
app.use('/api/v1/', AppRoute);

//test endpoints

app.post('/uploadFile', upload.single('file'), (req, res) => {
  console.log(`storage location is ${req.hostname}/${req.file.path}`)
  return res.send(req.file);
})


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