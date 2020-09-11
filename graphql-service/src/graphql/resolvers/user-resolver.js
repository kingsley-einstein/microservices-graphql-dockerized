const rp = require("request-promise");
const conf = require("../config");
const { DefaultError } = require("../../custom");

const BASE_URL = conf.ZUUL_GATEWAY_URL + conf.SERVICES.USER_SERVICE.name + conf.SERVICES.USER_SERVICE.basePath;
const rConfig = {
 json: true,
 resolveWithFullResponse: true,
 simple: false
};

class UserResolvers {   
 static async register(body) {
  try {
   const userResponse = await rp.post(BASE_URL + "/auth/create", {
    ...rConfig,
    body
   });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);
   
   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }

 static async findById(id) {
  try {
   const userResponse = await rp.get(BASE_URL + "/auth/byId/" + id, { ...rConfig });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);
   
   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }

 static async findAll() {
  try {
   const userResponse = await rp.get(BASE_URL + "/auth/all", { ...rConfig });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);
   
   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }

 static async findLoggedUser(headers) {
  try {
   const userResponse = await rp.get(BASE_URL + "/auth/logged", {
    ...rConfig,
    headers
   });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);

   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }

 static async findAllWithLimit(limit, page) {
  try {
   const userResponse = await rp.get(BASE_URL + `/auth/many/limited?limit=${limit}&page=${page}`, {
    ...rConfig
   });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);
   
   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }

 static async updateById(headers, body) {
  try {
   const userResponse = await rp.patch(BASE_URL + "/auth/update/byId", {
    ...rConfig,
    headers,
    body
   });

   if (userResponse.statusCode >= 400)
    throw new DefaultError(userResponse.statusCode, userResponse.body.response);
   
   return Promise.resolve(userResponse.body.response);
  } catch (error) {
   return Promise.reject({
    code: error.c || 500,
    response: error.message
   });
  }
 }
}

module.exports = UserResolvers;
