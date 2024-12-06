const academicYearModel = require("../../../models/Academic/AcademicYear.model");

const UpdateAcademicYear = async (req, res) => {

    const { yearId } = req.params; // Extract the academic year ID from the request parameters

    const { name, fromYear, toYear, isCurrent } = req.body; // Extract the fields to update from the request body

    // Check if an academic year with the same name already exists
    const createdAcademicYearFound = await academicYearModel.findOne({ name: name });
    if (createdAcademicYearFound) throw { statusCode: 400, message: "Academic Year Already Exists" };

    // Update the academic year with the new values
    const updatedYear = await academicYearModel.findByIdAndUpdate(
        { _id: yearId },
        {
            $set: {
                name: name,
                fromYear: fromYear,
                toYear: toYear,
                isCurrent: isCurrent,
                createdBy: req.user._id // Set the user ID as the creator
            }
        },
        {
            new: true, // Return the updated document
            runValidators: true // Run validation checks on the updated values
        }
    );

    // If the update fails, throw an error
    if (!updatedYear) throw { statusCode: 400, message: "Academic Year Update Failed" };

    // Send a success response with the updated academic year
    res.status(200).json({
        status: "Success",
        message: "Academic Year Updated Successfully",
        updatedYear: updatedYear
    });

}

module.exports = UpdateAcademicYear;
