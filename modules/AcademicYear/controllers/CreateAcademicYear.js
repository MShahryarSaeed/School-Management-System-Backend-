const academicYearModel = require("../../../models/Academic/AcademicYear.model");
const adminModel = require("../../../models/Staff/Admin.model");

const CreateAcademicYear = async (req, res) => {

    const { name, fromYear, toYear, isCurrent } = req.body;

    // Validate required fields
    if (!name) throw { statusCode: 400, message: "Name is Required" };
    if (!fromYear) throw { statusCode: 400, message: "From Year is Required" };
    if (!toYear) throw { statusCode: 400, message: "To Year is Required" };
    if (isCurrent === undefined) throw { statusCode: 400, message: "Is Current is Required" };

    // Check if the academic year already exists
    const academicYear = await academicYearModel.findOne({ name });
    if (academicYear) throw { statusCode: 400, message: "Academic Year Already Exists" };

    // Create a new academic year if it doesn't exist
    const newAcademicYear = await academicYearModel.create({
        name:name,
        fromYear:fromYear,
        toYear:toYear,
        isCurrent:isCurrent,
        createdBy: req.user._id
    });

    if (!newAcademicYear) throw { statusCode: 400, message: "Academic Year Creation Failed" };

    // Find the current admin and associate the new academic year with them
    const currentAdmin = await adminModel.findById(req.user._id);
    if (!currentAdmin) throw { statusCode: 400, message: "Admin not found" };

    currentAdmin.academicYears.push(newAcademicYear._id);
    await currentAdmin.save();

    // Send a success response
    res.status(201).json({
        status: "Success",
        message: "Academic Year Created Successfully",
        newAcademicYear
    });

}

module.exports = CreateAcademicYear;
