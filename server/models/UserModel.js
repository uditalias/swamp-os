var mongoose    = require('mongoose'),
    inject      = require('appolo-express').inject,
    bcrypt      = require('bcrypt'),
    Q           = require('q');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activated: {type: Boolean, default: true }
});

if (!userSchema.options.toObject) userSchema.options.toObject = {};

userSchema.options.toObject.transform = function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
    delete ret.__v;
};

userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {

    var deferred = Q.defer();

    bcrypt.compare(candidatePassword, this.password, deferred.makeNodeResolver());

    return deferred.promise;
};

var userModel = mongoose.model('User', userSchema);

inject.addObject('UserModel',userModel);

module.exports = userModel;