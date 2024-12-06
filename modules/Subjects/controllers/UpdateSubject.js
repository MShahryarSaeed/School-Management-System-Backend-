const subjectModel = require("../../../models/Academic/Subject.model");

const UpdateSubject = async (req, res) => {

    const { subjectId } = req.params;
    const { name, description, academicTerm, duration } = req.body;

    const subjectFound=await subjectModel.findOne({name});

    if (subjectFound) throw { statusCode: 400, message: "Subject Already Exists!S" };

    const updatedSubject = await subjectModel.findByIdAndUpdate(
        subjectId,
        {
            $set: {
                name,
                description,
                academicTerm,
                duration,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedSubject) throw { statusCode: 400, message: "Subject update failed" };

    res.status(200).json({
        status: "Success",
        message: "Subject updated successfully",
        updatedSubject
    });
};

module.exports = UpdateSubject;
