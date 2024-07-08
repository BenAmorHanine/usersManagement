const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const hashPassword  = require('../tools/hashPassword');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: { type: String, required: true , minlength: 3, maxlength: 30 },
  
  email: { type: String, required: true,  unique: true, match: /.+\@.+\..+/, validate: {validator: validator.isEmail} },
  
  password: { type: String, required: true, minlength: 6 },
  //userType: { type: String, enum: ['admin', 'normal'], required: true },
  
 role : {type :Schema.Types.ObjectId, ref: 'Role', required: true, default : '668686173781f594882a1d37'},
  
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
      this.password = await hashPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
