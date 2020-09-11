import express from "express";
import morgan from "morgan";
import { Eureka } from "eureka-js-client";
import router from "./router";

const app: express.Application = express();
const port = parseInt(process.env.PORT || "5900");

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

app.get("/status", (req, res) => {
 res.status(200).json({
  status: "UP"
 });
});

app.get("/health", (req, res) => {
 res.status(200).json({
  health: "HEALTHY"
 });
});

app.get("/", (req, res) => {
 res.status(200).json({
  message: "WELCOME TO THE HOMEPAGE"
 });
});

const eureka = new Eureka({
 instance: {
  app: "auth-service",
  ipAddr: "127.0.0.1",
  hostName: "localhost",
  port: {
   "@enabled": true,
   $: port
  },
  statusPageUrl: `http://localhost:${port}/status`,
  healthCheckUrl: `http://localhost:${port}/health`,
  homePageUrl: `http://localhost:${port}`,
  vipAddress: "auth-service",
  dataCenterInfo: {
   name: "MyOwn",
   "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo"
  }
 },
 eureka: {
  registerWithEureka: true,
  preferIpAddress: true,
  serviceUrls: {
   default: ["http://localhost:9087/eureka/apps"]
  }
 }
});

app.listen(port, () => {
 console.log("Server running on " + port);
 eureka.start((err) => {
  if (err)
   throw err;
  console.log("Instance has been registered.")
 })
});
