const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true , minlength: 3, maxlength: 30 },
  email: { type: String, required: true,  unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  //userType: { type: String, enum: ['admin', 'normal'], required: true },
  role : {type :Schema.Types.ObjectId, ref: 'Role', required: true},
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;