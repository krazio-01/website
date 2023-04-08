const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required:true
    },

    username: {
        type: String,
        required:true,
        unique:true
    },

    email: {
        type: String,
        required:true,
        unique:true
    },

    password: {
        type: String,
        required:true
    },

    confpass: {
        type: String,
        required:true
    },

    phone: {
        type: Number,
        required:true
    },

    gender: {
        type: String,
        required:true
    },
})

// hasing password
userSchema.pre("save", async function(next) {

    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);

        this.confpass = undefined;
    }
    next();
});

// we need to create collection
const register = new mongoose.model("Register", userSchema);

module.exports = register;