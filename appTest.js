/*
//const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//--12.3
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) Global Mıddlewares

//Serving static files
//app.use(express.static(`${__dirname}/public`)); //static files
app.use(express.static(path.join(__dirname), 'public'));

//10.21
//Set Security HTTP headers
app.use(helmet());

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//--10.20
//Limit request from sama API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//dev GET /api/v1/tours 200 67.100 ms - 8805
//tiny GET /api/v1/tours 200 8805 - 3.895 ms - no color 200

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //middleware //bunu kaldırsak undifenddd olarak algılanır.

//--10.22
//Data sanitization against NoSql query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//--10.23
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// //Creating our own Middleware
// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);

  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
// );

// 2)Routes Handlers
//tourRoutes.js - userRoutes.js
//end

// //GET
// app.get('/api/v1/tours', getAllTours);

// //POST
// app.post('/api/v1/tours', createTour);

// //GET
// app.get('/api/v1/tours/:id', getTour);

// //PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// //DELETE
// app.delete('/api/v1/tours/:id', deleteTour);

// // 3) Routes

// const tourRouter = express.Router();
// const userRouter = express.Router();

// //app.route('/api/v1/tours').get(getAllTours).post(createTour);

// tourRouter.route('/').get(getAllTours).post(createTour);

// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// //Implementing the Users Routes
// userRouter.route('/').get(getAllUsers).post(createUser);

// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.get('/',(req,res)=>{
  res.status(200).render
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//--11.9
app.use('/api/v1/reviews', reviewRouter);

//9.3
app.all('*', (req, res, next) => {
  // // v1
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cant find ${req.originalUrl} on this server!`,
  // });

  // // v2
  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // // v3

  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// 9.5
app.use(globalErrorHandler);

// 4)Server
// //server.js

module.exports = app;
*/
