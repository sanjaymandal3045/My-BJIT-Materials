const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Full name was not provided"],
        maxLength: 30,
    },
    access: {
        type: String,
        required: [true, "Username was not provided"],
        maxLength: 10,
    },
    email: {
        type: String,
        unique: [true,"Email should be unique"], // Unique property here
        required: [true, "Email was not provided"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: "Invalid email format",
        },
    },
    age: {
        type: Number,
        min: 10,
        required:[true, "age was not provided"],
    },
    userName: {
        type: String,
        unique: [true,"userName should be unique"],
        required: [true, "Username was not provided"],
        maxLength: 30,
    }
    // createdAt: {
    //     type: Date,
    //     required:false,
    //     default:false,
    // }
});

const User = mongoose.model("User", userSchema);
module.exports = User;