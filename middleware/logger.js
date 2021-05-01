const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.orginalrl}`
  );
  next();
};

module.exports = logger;
