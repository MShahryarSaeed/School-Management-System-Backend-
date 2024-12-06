const classLevelModel = require("../../../models/Academic/ClassLevel.model");

const DeleteClassLevel = async (req, res) => {


    const { levelId } = req.params;

    const deletedClassLevel = await classLevelModel.findByIdAndDelete(levelId);

    if (!deletedClassLevel) throw { statusCode: 400, message: "Class Level deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Class Level deleted successfully",
        deletedClassLevel:deletedClassLevel
    });
};

module.exports = DeleteClassLevel;
