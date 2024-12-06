const academicYearModel = require("../../../models/Academic/AcademicYear.model");

const GetAllAcademicYears = async (req, res) => {

    // Fetch all academic years from the database
    const academicYears = await academicYearModel.find({});

    // Check if any academic years are found
    if (!academicYears) throw { statusCode: 400, message: "No Academic Years Found" };

    // Send a success response with the retrieved academic years
    res.status(200).json({
        status: "Success",
        message: "Get All Academic Years Successfully",
        academicYears: academicYears
    });

}

module.exports = GetAllAcademicYears;
