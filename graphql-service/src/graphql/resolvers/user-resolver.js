const rp = require("request-promise");

class UserResolvers {   
 static async register(body) {
  try {
   const userResponse = await rp.post("", { body });
   return Promise.resolve(userResponse.body);
  } catch (error) {
   return Promise.reject({
    statusCode: 500,
    response: "Error"
   });
  }
 }

 static async login(body) {
  try {
   const userResponse = await rp.post("", { body });
   return Promise.resolve(userResponse.body);
  } catch (error) {
   return Promise.reject({
    statusCode: 500,
    response: "Error"
   });
  }
 }
}

module.exports = UserResolvers;
