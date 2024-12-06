const teacherModel = require("../../../models/Staff/Teacher.model");
const bcryptjs = require("bcryptjs");

const UpdateTeacherProfile = async (req, res) => {
    const { teacherId } = req.params;

    if (req.user._id !== teacherId) {
        throw { statusCode: 400, message: "You Can't Update Your Profile" };
    }

    const { name, email } = req.body;

    const existEmail = await teacherModel.findOne({ email });

    if (existEmail) {
        throw { statusCode: 400, message: "Email Already Exists" };
    }

    if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }

    const updatedTeacher = await teacherModel.findByIdAndUpdate(
        teacherId,
        {
            $set: {
                name: name,
                email: email,
                password: req.body.password,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedTeacher) {
        throw { statusCode: 400, message: "Profile Not Updated" };
    }

    res.status(200).json({
        status: "Success",
        message: "Profile Updated Successfully",
        updatedTeacher: updatedTeacher
    });
};

module.exports = UpdateTeacherProfile;
