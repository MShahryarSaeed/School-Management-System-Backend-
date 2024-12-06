const academicTermModel = require("../../../models/Academic/AcademicTerm.model");

const UpdateAcademicTerm = async (req, res) => {


    const { termId } = req.params;
    const { name, description, duration } = req.body;

    const academicTermFound=await academicTermModel.findOne({name:name});

    if (academicTermFound) throw { statusCode: 400, message: "Academic Term already Exists" };

    const updatedTerm = await academicTermModel.findByIdAndUpdate(
        {_id:termId},
        {
            $set: {
                name:name,
                description:description,
                duration:duration,
                createdBy:req.user._id
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedTerm) throw { statusCode: 400, message: "Academic Term update failed" };

    res.status(200).json({
        status: "Success",
        message: "Academic Term updated successfully",
        updatedTerm:updatedTerm
    });
};

module.exports = UpdateAcademicTerm;
