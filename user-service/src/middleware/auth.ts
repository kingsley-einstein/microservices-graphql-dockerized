import { DataStore } from "../db/datastore";
import { CustomError } from "../_custom_/error";

const store = new DataStore();

export default async (req: any, res: any, next: any) => {
 try {
  if (!req.headers.token) {
   throw new CustomError("Token not present in headers", 401);
  }
  const id: string = req.headers.token.split(".")[1];
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) throw new CustomError("ID should be a number", 400);
  const user = await store.findById(parsedId);
  req.user = user;
  // req.token = req.headers.token;
  next();
 } catch (error) {
  res.status(error.code).json({
   code: error.code,
   response: error.message
  });
 }
};