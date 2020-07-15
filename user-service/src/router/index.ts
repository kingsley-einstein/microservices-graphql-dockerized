import { Router } from "express";
import AuthMiddleware from "../middleware/auth";
import AuthController from "../controller/auth";

const router = Router();

router.post("/auth/create", AuthController.create);
router.get("/auth/byId/:_id", AuthController.findByID);
router.get("/auth/all", AuthController.findAll);
router.get("/auth/many/limited", AuthController.findLimited);
router.get("/auth/logged", AuthMiddleware, AuthController.getLoggedUser);
router.patch("/auth/update/byId", AuthMiddleware, AuthController.updateByID);
router.patch("/auth/update/where", AuthMiddleware, AuthController.updateMatching);
router.delete("/auth/delete", AuthMiddleware, AuthController.deleteById);

export default router;
