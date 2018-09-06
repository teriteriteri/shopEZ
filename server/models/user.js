const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

//an object
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  picture: String,
  isSeller: { type: Boolean, default: false },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  created: { type: Date, default: Date.now },
});


UserSchema.pre('save', function(next) {
  var user = this;//user schema itself

  //if user pw not changed, or new user, do callback funct
  if (!user.isModified('password')) return next();
  
  //else hash pw, then callback funct
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    
    user.password = hash;
    next();
  });
});

//comparePassword, developer's choice name of the function
UserSchema.methods.comparePassword = function(password) {
    //compare pw and the one in database
  return bcrypt.compareSync(password, this.password);
};

//generate custom img each time user signs up
UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro'; 
  }

}

//'User'--name of the model used
module.exports = mongoose.model('User', UserSchema);


