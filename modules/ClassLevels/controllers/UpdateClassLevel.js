const classLevelModel = require("../../../models/Academic/ClassLevel.model");

const UpdateClassLevel = async (req, res) => {


    const { levelId } = req.params;
    const { name, description } = req.body;

    const classFound=await classLevelModel.findOne({name:name});
    if (classFound) throw { statusCode: 400, message: "Class Level already exists" };

    const updatedClassLevel = await classLevelModel.findByIdAndUpdate(
        {_id:levelId},
        {
            $set: {
                name:name,
                description:description,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedClassLevel) throw { statusCode: 400, message: "Class Level update failed" };

    res.status(200).json({
        status: "Success",
        message: "Class Level updated successfully",
        updatedClassLevel:updatedClassLevel
    });
};

module.exports = UpdateClassLevel;

//ok
