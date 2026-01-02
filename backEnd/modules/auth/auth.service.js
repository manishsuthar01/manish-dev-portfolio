const User = require("../../db/User.model");
const bcryptjs= require("bcryptjs");

async function loginUser({ userName, password }) {
  const user = await User.findOne({userName}).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  const isMatchedPassword =await bcryptjs.compare(password, user.password);
  if (!isMatchedPassword) {
    throw new Error("Invalid credentials");
  }

  return user;
}
 
 
module.exports = {
  loginUser, 
}; 
 