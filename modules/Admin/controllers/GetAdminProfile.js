const adminModel = require("../../../models/Staff/Admin.model");

const GetAdminProfile = async (req, res) => {

    // Find the admin by their ID (stored in req.user from middleware)
    const admin = await adminModel.findById(req.user._id).populate("teachers students programs academicYears academicTerms yearGroups classLevels");
    
    if (!admin) throw { statusCode: 400, message: "Admin Not Found" };

    // Exclude the password from the admin data
    const { password, ...rest } = admin._doc;

    // Send the admin profile (excluding password) as a response
    res.status(200).json({
        status: "Success",
        message: "Get Admin Profile Successfully",
        ProfileAdmin: rest
    });

}

module.exports = GetAdminProfile;

//ok
