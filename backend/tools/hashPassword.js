//hashing the password everytime it is modified (created or updated )

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
  
  module.exports =  hashPassword ;