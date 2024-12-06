const subjectModel = require("../../../models/Academic/Subject.model");

const DeleteSubject = async (req, res) => {

    
    const { subjectId } = req.params;

    const deletedSubject = await subjectModel.findByIdAndDelete(subjectId);

    if (!deletedSubject) throw { statusCode: 400, message: "Subject deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Subject deleted successfully",
        deletedSubject
    });
};

module.exports = DeleteSubject;
