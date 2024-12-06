
const errorHandler = (error, req, res, next) => {

    if (error) {

        const statusCode = error.statusCode || 500;
        const message = error.message || 'INTERNEL SERVER ERROR | 500';

        res.status(statusCode).json({

            status: "Failed",
            error: message,
            stack: error.stack
            
        });

    } else {

        next();

    }

}


module.exports = errorHandler;