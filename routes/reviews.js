const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const { getReviews } = require('../controllers/reviews');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name, description',
  }),
  getReviews
);

module.exports = router;
