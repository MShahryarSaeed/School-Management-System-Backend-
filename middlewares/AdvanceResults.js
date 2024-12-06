

const AdvanceResults = (model, populate) => {

    return async (req, res, next) => {

        let MainQuery = model.find();

        // Convert Query String
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalTeachers = await model.countDocuments();

        // populate
        if (populate) {
            MainQuery = MainQuery.populate(populate);
        }

        // Pagination Results
        const pagination = {};

        if (endIndex < totalTeachers) {
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }

        // add prev
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }

        const teachers = await MainQuery.find({
            ...(req.query.name && { name: { $regex: req.query.name, $options: 'i' } }),
            ...(req.query.email && { email: req.query.email }),
        }).skip(skip).limit(limit);

        if (!teachers) throw { statusCode: 400, message: "No Teachers Found" };

        res.results = {
            status: "Success",
            message: "Get All Teachers successfully",
            totalTeachers: totalTeachers,
            pagination: pagination,
            ResultsPerPage: teachers.length,
            data: teachers
        }

        // Add user into the response
        // res.status(200).json({
        //     status:"Success",
        //     message:"Get All Teachers successfully",
        //     totalTeachers:totalTeachers,
        //     pagination:pagination,
        //     ResultsPerPage:teachers.length,
        //     teachers:teachers
        // });
        next();
    }

}

module.exports = AdvanceResults;