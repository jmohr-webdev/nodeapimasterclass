const express = require('express');
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

// Include other resource routers
const courseRouter = require('./courses');

// Rerouter into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
