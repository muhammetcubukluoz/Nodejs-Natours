const express = require('express');
const tourContoller = require('./../controllers/tourController');
//10.8
const authController = require('./../controllers/authController');
//--11.12
//const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

//param middleware
// // router.param('id', tourContoller.checkId);
// router.param('id', (req, res, next, val) => {
//   //console.log(`Tour id is: ${val}`);
//   next();
// });

//Chaning Multiple Middleware Func
//Create a checkBody middleware
//Check if body contains the name and price property
//ıf not, sendback 400(bad request)
//add it to the post handler stack

//--11.12
//POST /tour/2345ad4/reviews
//GET /tour/2345ad4/reviews

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourContoller.aliasTopTours, tourContoller.getAllTours);

router.route('/tour-stats').get(tourContoller.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourContoller.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourContoller.getToursWithin);
// /turs-within?distance=233&center=-40,45&unit=mi
// /turs-within/233/center/-40,45/unit/mi

// --11.26
router.route('/distances/:latlng/unit/:unit').get(tourContoller.getDistances);

router
  .route('/')
  .get(tourContoller.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourContoller.createTour,
  );
//.post(middleware, tourContoller.createTour)
// .post(tourContoller.checkBody, tourContoller.createTour);
//.post(middleware, tourContoller.createTour)

router
  .route('/:id')
  .get(tourContoller.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourContoller.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourContoller.deleteTour,
  );

module.exports = router;
