const bcrypt = require('bcrypt-nodejs');
const validator = require('validator')
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email:{
      type:String,
      unique:true,
      required:true,
      trim:true,
      lowercase:true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error('無効なメールアドレスです。')
          }
      }
  },
  password:{
    type:String,
    required:true,
    minlength:6,
    trim:true,
    validate(value){
        if(value.length<6){
            throw new Error('パスワードは6文字以上にしてください。')
        }else if(value.includes('password')){
            throw new Error('"password"はパスワードとして不適格です。')
        }
    }
  }
},{
  timestamps: true
});

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
