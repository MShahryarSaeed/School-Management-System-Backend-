const jwtManager = require("../../../managers/jwtManager");
const adminModel = require("../../../models/Staff/Admin.model");
const bcryptjs = require("bcryptjs");

const AdminLogIn = async (req, res) => {

    const { email, password } = req.body;

    // Find admin by email
    const getUser = await adminModel.findOne({ email });
    if (!getUser) throw { statusCode: 400, message: "Invalid Email or Password" };

    // Compare input password with stored hashed password
    const comparePassword = await bcryptjs.compare(password, getUser.password);
    if (!comparePassword) throw { statusCode: 400, message: "Invalid Email or Password" };

    // Generate JWT access token
    const accessToken = jwtManager(getUser);

    // Exclude password from the response
    const { password: pass, ...rest } = getUser._doc;

    // Set access token in HTTP-only cookie and send response
    res.cookie('accessToken', accessToken, { httpOnly: true })
       .status(200)
       .json({
           status: "Success",
           message: "Admin Logged In Successfully",
           admin: rest
       });

};

module.exports = AdminLogIn;


//ok