const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _=require("lodash");
const bcrypt=require("bcryptjs");
const validator = require("validator");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: '{Value} is not valid'
        }
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
    }],
    productsInCart: [{
        pid:{type:String},
        quantity:{type:Number}
    }]

});

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({
        id: user._id.toHexString()
    }, "secret123");
    user.Tokens.push({
        access,
        token
    });
    return user.save().then(
        () => {
            return token;
        }
    );
}
UserSchema.methods.toJSON = function () { //this function detemines what exactly gets send back when a mongoose model get converted into JSON
    let user = this;
    let userObject = user.toObject(); //this function is reponsible for taking our mongoose variable 'user' and converts into regular object
    return _.pick(userObject, ["name", "email"]);
}

UserSchema.methods.removeProductById=function(id) {
    const user=this;
    return user.update({
        $pull:{
            productsInCart:{pid:id}
        }
    }
    );
}

UserSchema.methods.removeToken=function(token){
    var user=this;
    return user.update({
        $pull:{
            Tokens:{token}
        }
    });
   
};


UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, "secret123");
    } catch (e) {
        return Promise.reject();

    }
    return User.findOne({
        "_id": decoded.id,
        "Tokens.token": token,
        "Tokens.access": "auth"
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
module.exports = {
    User
};