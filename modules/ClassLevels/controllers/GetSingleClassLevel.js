const classLevelModel = require("../../../models/Academic/ClassLevel.model");

const GetSingleClassLevel = async (req, res) => {


    const { levelId } = req.params;

    const classLevel = await classLevelModel.findById(levelId)
        .populate('students')
        .populate('subjects')
        .populate('teachers');

    if (!classLevel) throw { statusCode: 400, message: "Class Level not found" };

    res.status(200).json({
        status: "Success",
        message: "Get Single Class Level successfully",
        classLevel:classLevel
    });
};

module.exports = GetSingleClassLevel;
