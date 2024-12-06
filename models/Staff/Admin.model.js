const mongoose = require("mongoose");
const bcryptjs=require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,'Name is Required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true,'Email is Required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true,'Password is Required'],
        },
        role: {
            type: String,
            default: "admin",
        },
        academicTerms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm",
            },
        ],
        programs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program",
            },
        ],
        yearGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "YearGroup",
            },
        ],
        academicYears: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicYear",
            },
        ],
        classLevels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassLevel",
            },
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// mongoose pre Middleware
adminSchema.pre('save',async function(next){

    if(!this.isModified('password'))  {
        next();
    }

    this.password=await bcryptjs.hashSync(this.password,10);

    next();
})

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
