const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name :{type : String , required : true}
});

const Permission = mongoose.model('Permission', PermissionSchema );
module.exports = Permission;