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

// // @desc      Get a single course
// // @route     GET /api/v1/courses/:id
// // @access    public
// exports.getCourse = asyncHandler(async (req, res, next) => {
//   const course = await Course.findById(req.params.id).populate({
//     path: 'bootcamp',
//     select: 'name description',
//   });

//   if (!course) {
//     return next(
//       new ErrorResponse(
//         `Nooooooooooooo course with the id of ${req.params.id}`
//       ),
//       404
//     );
//   }

//   res.status(200).json({ succes: true, data: course });
// });

// // @desc      Add a course
// // @route     POST /api/v1/bootcamps/:bootcampId/courses
// // @access    private
// exports.addCourse = asyncHandler(async (req, res, next) => {
//   req.body.bootcamp = req.params.bootcampId;
//   req.body.user = req.user.id;

//   const bootcamp = await Bootcamp.findById(req.params.bootcampId);

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
//       404
//     );
//   }

//   if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `The user with ID ${req.user.id} is not authorized to add a couse to bootcamp with the id of ${bootcamp._id}`,
//         401
//       )
//     );
//   }

//   const course = await Course.create(req.body);

//   res.status(200).json({ succes: true, data: course });
// });

// // @desc      Update a course
// // @route     PUT /api/v1/bootcamps/:bootcampId/courses/:courseId
// // @access    private
// exports.updateCourse = asyncHandler(async (req, res, next) => {
//   let course = await Course.findById(req.params.id);
//   req.body.user = req.user.id;

//   if (!course) {
//     return next(
//       new ErrorResponse(`No course with the id of ${req.params.id}`),
//       404
//     );
//   }

//   if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `The user with ID ${req.user.id} is not authorized to add a couse to course with the id of ${course._id}`,
//         401
//       )
//     );
//   }

//   course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({ succes: true, data: course });
// });

// // @desc      Delete a course
// // @route     PUT /api/v1/bootcamps/:bootcampId/courses/:courseId
// // @access    private
// exports.deleteCourse = asyncHandler(async (req, res, next) => {
//   const course = await Course.findById(req.params.id);
//   req.body.user = req.user.id;

//   if (!course) {
//     return next(
//       new ErrorResponse(`No course with the id of ${req.params.id}`),
//       404
//     );
//   }

//   if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `The user with ID ${req.user.id} is not authorized to add a couse to course with the id of ${course._id}`,
//         401
//       )
//     );
//   }

//   await course.remove();

//   res.status(200).json({ succes: true, data: {} });
// });