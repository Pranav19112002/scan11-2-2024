const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
 email : String,
 password: String,
 cpassword: String,
});


const adminmodel = mongoose.model("admins",adminschema)
module.exports = adminmodel