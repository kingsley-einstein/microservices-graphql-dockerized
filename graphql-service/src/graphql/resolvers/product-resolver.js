const rp = require("request-promise");
const conf = require("../config");
const { DefaultError } = require("../../custom");

const BASE_URL = conf.ZUUL_GATEWAY_URL + conf.SERVICES.PRODUCT_SERVICE.name + conf.SERVICES.PRODUCT_SERVICE.basePath;
const rConfig = {
 simple: false,
 resolveWithFullResponse: true,
 json: true
};

class ProductResolvers {
 static async create(body, headers) {
  try {
   const productResponse = await rp.post(BASE_URL + "/create", {
    ...rConfig,
    body,
    headers
   });

   if (productResponse.statusCode >= 400)
    throw new DefaultError(productResponse.statusCode, productResponse.body.response);

   return Promise.resolve(productResponse.body.response);
  } catch (error) {
   return Promise.reject(
    new Error(
     JSON.stringify({
      code: error.c || 500,
      response: error.message
     })
    )
   );
  }
 }
}

module.exports = ProductResolvers;
