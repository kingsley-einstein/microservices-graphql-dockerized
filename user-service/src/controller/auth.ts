import store from "../db/repository";

class UserController {
 static async create(req: any, res: any) {
  try {
   const { name, age, dob } = req.body;
   const response = await store.create({ name, age, dob });
   res.status(201).json({
    code: 201,
    response
   });
  } catch (error) {
   res.status(500).json({
    code: 500,
    response: error.message
   });
  }
 }

 static async findByID(req: any, res: any) {
  try {
   const { _id } = req.params;
   const response = await store.findById(parseInt(_id));
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }

 static async findAll(req: any, res: any) {
  try {
   const response = await store.findAll();
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(500).json({
    code: 500,
    response: error.message
   });
  }
 }

 static async findLimited(req: any, res: any) {
  try {
   const { limit, page } = req.query;
   const response = await store.findManyAndLimit(
    parseInt(limit),
    parseInt(page)
   );
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(500).json({
    code: 500,
    response: error.message
   });
  }
 }

 static async getLoggedUser(req: any, res: any) {
  try {
   const { user } = req;
   res.status(200).json({
    code: 200,
    response: user
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }

 static async updateByID(req: any, res: any) {
  try {
   const { id } = req.user;
   const response = await store.updateById(id, req.body);
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }

 static async updateMatching(req: any, res: any) {
  try {
   const where = {
    id: req.user.id
   };
   Object.keys(req.query).forEach((key) => {
    where[key] = req.query[key];
   });
   const response = await store.updateWhere(where, req.body);
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }

 static async deleteById(req: any, res: any) {
  try {
   const { id } = req.user;
   await store.deleteById(id);
   res.status(200).json({
    code: 200,
    respose: "Successfully deleted item"
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }
}

export const AuthController = UserController;
export default UserController;
