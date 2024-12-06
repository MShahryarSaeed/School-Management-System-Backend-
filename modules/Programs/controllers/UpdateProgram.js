const programModel = require("../../../models/Academic/Program.model");

const UpdateProgram = async (req, res) => {


    const { programId } = req.params;
    const { name, description, duration } = req.body;

    const programFound=await programModel.findOne({name});
    if (programFound) throw { statusCode: 400, message: "This Program already exists" };

    const updatedProgram = await programModel.findByIdAndUpdate(
        programId,
        {
            $set: {
                name:name,
                description:description,
                duration:duration,
                createdBy: req.user._id,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedProgram) throw { statusCode: 400, message: "Program update failed" };

    res.status(200).json({
        status: "Success",
        message: "Program updated successfully",
        updatedProgram:updatedProgram
    });
};

module.exports = UpdateProgram;
