const adminModel = require("../../../models/Staff/Admin.model");

const GetAllAdmins = async (req, res) => {

    /*
    // Fetch all admins from the database
    const allAdmins = await adminModel.find({});
    if (!allAdmins) throw { statusCode: 400, message: "No Admins Found" };

    // Remove passwords from the admin data
    const adminsWithoutPasswords = allAdmins.map((admin) => {
        const { password, ...rest } = admin._doc;
        return rest;
    });

    // Send response with all admins (excluding passwords)
    res.status(200).json({
        status: "Success",
        message: "Get All Admins Successfully",
        allAdmins: adminsWithoutPasswords,
    });

    */

    res.status(200).json(res.results)

}

module.exports = GetAllAdmins;

//ok
