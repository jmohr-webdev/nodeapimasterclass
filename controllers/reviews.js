const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/bootcamps/:bootcampId/reviews
// @access    public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res
      .status(200)
      .json({ succes: true, count: reviews.length, data: reviews });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

// @desc      Get a single review
// @route     GET /api/v1/reviews/:id
// @access    public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ succes: true, data: review });
});

// @desc      Add a review
// @route     POST /api/v1/bootcamps/:bootcampId/reviews
// @access    private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({ succes: true, data: review });
});

// @desc      Update a review
// @route     PUT /api/v1/bootcamps/:bootcampId/reviews/:reviewId
// @access    private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  req.body.user = req.user.id;

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`),
      404
    );
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} is not authorized to update this review with an id of ${review._id}`,
        401
      )
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ succes: true, data: review });
});

// @desc      Delete a review
// @route     PUT /api/v1/bootcamps/:bootcampId/reviews/:reviewId
// @access    private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  req.body.user = req.user.id;

  if (!review) {
    return next(
      new ErrorResponse(`No review with the id of ${req.params.id}`),
      404
    );
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} is not authorized to delete a review with id of ${review._id}`,
        401
      )
    );
  }

  await review.remove();

  res.status(200).json({ succes: true, data: {} });
});
