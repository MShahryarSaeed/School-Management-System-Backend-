const academicYearModel = require("../../../models/Academic/AcademicYear.model");

const GetSingleAcademicYear = async (req, res) => {

    const { yearId } = req.params; // Extract the year ID from the request parameters

    // Find the academic year by its ID
    const academicYear = await academicYearModel.findById(yearId);

    // If the academic year is not found, throw an error
    if (!academicYear) throw { statusCode: 400, message: "Academic Year Not Found" };

    // Send a success response with the retrieved academic year
    res.status(200).json({
        status: "Success",
        message: "Get Single Academic Year Successfully",
        academicYear: academicYear
    });

}

module.exports = GetSingleAcademicYear;
