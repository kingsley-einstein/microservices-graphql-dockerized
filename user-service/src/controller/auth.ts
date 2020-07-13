import Store from "../db/datastore";

const store = new Store();

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
   const response = await store.findById(_id);
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

 static async updateByID(req: any, res: any) {
  try {
   const { _id } = req.params;
   const response = await store.updateById(_id, req.body);
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

 static async updateMatching(req: any, res: any) {}
}