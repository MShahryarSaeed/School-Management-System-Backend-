const adminModel = require("../../../models/Staff/Admin.model");
const bcryptjs = require("bcryptjs");

const UpdateSingleAdmin = async (req, res) => {

    const { adminId } = req.params;

    // Ensure that only the admin themselves can update their profile
    if (req.user._id !== adminId) throw { statusCode: 400, message: "Only  Admin himself can update his profile" };

    const { name, email } = req.body;

    // Check if the new email already exists in the database
    const existEmail = await adminModel.findOne({ email });
    if (existEmail) throw { statusCode: 400, message: "Email Already Exists" };

    // If a password is provided, hash it before saving
    if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }

    // Update the admin's details in the database
    const updatedAdmin = await adminModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                name: name,
                email: email,
                password: req.body.password
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedAdmin) throw { statusCode: 400, message: "Update Single Admin Failed" };

    // Exclude the password from the updated admin data
    const { password, ...rest } = updatedAdmin._doc;

    // Send the updated admin details (excluding password) as a response
    res.status(200).json({
        status: "Success",
        message: "Update Single Admin Successfully",
        updatedAdmin: rest
    });

}

module.exports = UpdateSingleAdmin;
