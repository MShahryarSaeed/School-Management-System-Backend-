const classLevelModel = require("../../../models/Academic/ClassLevel.model");

const GetAllClassLevels = async (req, res) => {

    const classLevels = await classLevelModel.find({});

    if (!classLevels) throw { statusCode: 400, message: "No Class Levels found" };

    res.status(200).json({
        status: "Success",
        message: "Get All Class Levels successfully",
        classLevels:classLevels
    });
};

module.exports = GetAllClassLevels;
