const yearGroupModel = require("../../../models/Academic/YearGroup.model");

const UpdateYearGroup = async (req, res) => {
    
    const { yearGroupId } = req.params;
    const { name, academicYear } = req.body;

    const yearGroupFound=await yearGroupModel.findOne({name});
    if (yearGroupFound) throw { statusCode: 400, message: "Year Group already exists" };

    const updatedYearGroup = await yearGroupModel.findByIdAndUpdate(
        yearGroupId,
        {
            $set: {
                name:name,
                academicYear:academicYear,
                createdBy: req.user._id,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedYearGroup) throw { statusCode: 400, message: "Year Group update failed" };

    res.status(200).json({
        status: "Success",
        message: "Year Group updated successfully",
        updatedYearGroup
    });
};

module.exports = UpdateYearGroup;

//ok
