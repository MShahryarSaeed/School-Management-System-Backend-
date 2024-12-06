const adminModel = require("../../../models/Staff/Admin.model");
const bcryptjs = require("bcryptjs");

const Registration = async (req, res) => {

    const { name, email, password } = req.body;

    // Validate required fields
    if (!name) throw { statusCode: 400, message: "Name is Required" };
    if (name.length < 7 || name.length > 20) throw { statusCode: 400, message: "Name should be between 7-20 characters" };
    if (!email) throw { statusCode: 400, message: "Email is Required" };
    if (!password) throw { statusCode: 400, message: "Password is Required" };
    if (password.length < 8) throw { statusCode: 400, message: "Password must be at least 8 characters" };

    // Check if the admin already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) throw { statusCode: 400, message: "Admin Already Exists" };

    // Hash the password (commented out, should be enabled for security)
    // const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new admin
    const newAdmin = await adminModel.create({
        name:name,
        email:email,
        password:password // Use hashedPassword here once hashing is enabled
    });

    if (!newAdmin) throw { statusCode: 400, message: "Admin Registration Failed" };

    // Exclude password from the response
    const { password: pass, ...rest } = newAdmin._doc;

    // Send a success response
    res.status(201).json({
        status: "Success",
        message: "New Admin Registered Successfully",
        newAdmin: rest
    });

};

module.exports = Registration;

//Ok Controller
