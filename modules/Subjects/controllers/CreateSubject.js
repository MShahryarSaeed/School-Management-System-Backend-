const subjectModel = require("../../../models/Academic/Subject.model");
const programModel=require("../../../models/Academic/Program.model");

const CreateSubject = async (req, res) => {

    const{programId}=req.params;

    
    const { name, description, academicTerm, duration } = req.body;

    if (!name) throw { statusCode: 400, message: "Name is required" };
    if (!description) throw { statusCode: 400, message: "Description is required" };
    if (!academicTerm) throw { statusCode: 400, message: "Academic Term is required" };
    if (!duration) throw { statusCode: 400, message: "Duration is required" };

     //find the program
  const programFound = await programModel.findById(programId);
  if (!programFound) throw { statusCode: 400, message: "Program not found" };

//   check if subject already exists
const subjectFound=await subjectModel.findOne({name});
if (subjectFound) throw { statusCode: 400, message: "Subject already exists" };


    const newSubject = await subjectModel.create({
        name:name,
        description:description,
        academicTerm:academicTerm,
        duration:duration,
        createdBy: req.user._id,
    });

    if (!newSubject) throw { statusCode: 400, message: "Subject creation failed" };

    programFound.subjects.push(newSubject._id);
    await programFound.save();

    res.status(201).json({
        status: "Success",
        message: "Subject created successfully",
        newSubject
    });
};

module.exports = CreateSubject;

//ok
