const mongoose = require("mongoose");
const colors=require("colors");

const DataBaseConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL, {});

        console.log(colors.green('Coonnected To MongoDB Database Successfully'));



    } catch (error) {

        console.log(colors.red(`Error While Connecting to MongoDB Database , ${error}`));


    }


}

module.exports = DataBaseConnection;