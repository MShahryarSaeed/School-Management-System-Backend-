const yearGroupModel = require("../../../models/Academic/YearGroup.model");

const GetAllYearGroups = async (req, res) => {
    const yearGroups = await yearGroupModel.find({})
        .populate('academicYear')
        .populate('createdBy');

    if (!yearGroups) throw { statusCode: 400, message: "No Year Groups found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Year Groups successfully",
        yearGroups
    });
};

module.exports = GetAllYearGroups;
