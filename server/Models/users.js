const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number
    },
    address: [{
        street: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: Number
        },
        state: {
            type: String
        },
        phoneNo: {
            type: Number
        }
    }],
    Tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]


});



UserSchema.methods.generateAuthToken = function () {
    let user = this;
  let access='auth';
  let token=jwt.sign({id:user._id.toHexString()},"secret123");
   user.Tokens.push({access,token});
   return user.save().then(
       ()=>{
           return token;
       }
   );
}

UserSchema.statics.findByToken = function (token) {
    let decoded;
    try {
        decoded = jwt.verify(token, "secret123");
    } catch (e) {
        return Promise.reject(e);
    }
    User.findOne({
        "_id": decoded,
        "Tokens.token": token,
        "Tokens.access": 'auth'
    }).then(
        (user) => {
            return user;
        }
    ).catch((err) => {
        console.log(err);
    });

}

UserSchema.statics.findByCredentials = function (email, password) {
    const user = this;
    return user.findOne({
            email
        })
        .then(
            (user) => {
                if (!user) {
                    return Promise.reject();
                }
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, (err, res) => {
                        if (res) {
                            resolve(user);
                        } else {
                            reject();
                        }
                    });
                });
            }
        );
}


UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});
const User = mongoose.model("Users", UserSchema);
module.exports = {User};