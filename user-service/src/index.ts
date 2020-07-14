import express from "express";
import morgan from "morgan";
import router from "./router";

const app: express.Application = express();

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

app.listen(parseInt(process.env.PORT || "5900"), () => {
 console.log("Server running on port " + (process.env.PORT || "5900"));
});
