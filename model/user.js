const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', function(next) {
    let user = this;
    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err)
            };
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('users',userSchema);


