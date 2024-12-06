const yearGroupModel = require("../../../models/Academic/YearGroup.model");

const DeleteYearGroup = async (req, res) => {
    const { yearGroupId } = req.params;

    const deletedYearGroup = await yearGroupModel.findByIdAndDelete(yearGroupId);

    if (!deletedYearGroup) throw { statusCode: 400, message: "Year Group deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Year Group deleted successfully",
        deletedYearGroup
    });
};

module.exports = DeleteYearGroup;
