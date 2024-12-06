const yearGroupModel = require("../../../models/Academic/YearGroup.model");

const GetSingleYearGroup = async (req, res) => {
    const { yearGroupId } = req.params;

    const yearGroup = await yearGroupModel.findById(yearGroupId)
        .populate('academicYear')
        .populate('createdBy');

    if (!yearGroup) throw { statusCode: 400, message: "Year Group not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Year Group successfully",
        yearGroup
    });
};

module.exports = GetSingleYearGroup;
