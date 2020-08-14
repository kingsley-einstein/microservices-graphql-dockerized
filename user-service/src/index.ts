import express from "express";
import morgan from "morgan";
import { Eureka } from "eureka-js-client";
import router from "./router";

const app: express.Application = express();
const port = parseInt(process.env.PORT || "5900");

const eureka = new Eureka({
 instance: {
  app: "auth-service",
  ipAddr: "127.0.0.1",
  hostName: `http://localhost:${port}`,
  port,
  statusPageUrl: `http://localhost:${port}/`,
  healthCheckUrl: `http://localhost:${port}/`,
  vipAddress: "auth-service",
  dataCenterInfo: {
   name: "MyOwn",
   "@class": "com.netflix.appInfo.InstanceInfo$DefaultDataCenterInfo"
  }
 },
 eureka: {
  serviceUrls: {
   default: ["http://localhost:9087/eureka/apps"]
  }
 }
});

app.use(express.json());
app.use(express.urlencoded({
 extended: false
}));
app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
 res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, DELETE, POST");
 next();
});
app.use(morgan("dev"));
app.use("/api/v1", router);

app.listen(port, () => {
 console.log("Server running on " + port);
 eureka.start((err) => {
  if (err)
   throw err;
  console.log("Instance has been registered.")
 })
});
