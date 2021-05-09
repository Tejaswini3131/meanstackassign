const mongoose = require("mongoose");
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    mobilenumber : {
        type : Number,
        required : true
        
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    roles : {
        type : String,
        required : true
    }
})



userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: 19000
    });
}

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
       this.password = await bycrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.verifyPassword = function (password) {
    return bycrypt.compareSync(password, this.password);
};

const Users = new mongoose.model("users", userSchema);

module.exports = Users