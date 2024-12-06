

const isTeacher = (req, res, next) => {

    if (req.user.role === 'teacher') {

        next();

    } else {

        res.status(401).json({
            status: "Failed",
            error: "unAuthorized Teacher"
        });
    }

}

module.exports = isTeacher;