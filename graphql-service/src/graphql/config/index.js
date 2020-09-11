const config = {
 ZUUL_GATEWAY_URL: "http://localhost:9778",
 SERVICES: {
  USER_SERVICE: {
   name: "user-service",
   basePath: "/api/v1"
  },
  PRODUCT_SERVICE: {
   name: "product-service",
   basePath: "/api/v1"
  }
 }
};

module.exports = config;
