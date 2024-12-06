const academicTermModel = require("../../../models/Academic/AcademicTerm.model");

const DeleteAcademicTerm = async (req, res) => {


    const { termId } = req.params;

    const deletedTerm = await academicTermModel.findByIdAndDelete(termId);

    if (!deletedTerm) throw { statusCode: 400, message: "Academic Term deletion failed" };

    res.status(200).json({
        status: "Success",
        message: "Academic Term deleted successfully",
        deletedTerm
    });
    
};

module.exports = DeleteAcademicTerm;
