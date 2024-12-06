

const NotFound = (req, res, next) => {

    const error = new Error(`Can't Find ${req.url} on the Server`);

    next(error);
}

module.exports = NotFound;