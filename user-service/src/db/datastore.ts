import { User } from "./model";
import { CustomError } from "../_custom_/error";

class Store {
  _store: User[] = [];
  _idStore: number[] = [0];
  _tokenStore: string[] = [
   "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
  ];

  async create(body: any): Promise<User> {
   const id = this._idStore[this._idStore.length - 1] + 1;
   const token = this._tokenStore.map(
    t => (parseInt(t) * Math.floor(Math.random() * parseInt(t)))
    .toString()
   ).join("$") + "." + id.toString();
   const { name, age, dob } = body;
   const user: User = {
    id, token, name, age, dob
   };
   this._idStore.push(id);
   this._store = this._store.concat([user]);
   return this._store.find((u) => u.id === id);
  }

  async findById(id: number): Promise<User> {
   const user = this._store.find((user) => user.id === id);
   if (!user) {
    throw new CustomError(`User with id ${id} not found`, 404);
   }
   return user;
  }

  async findAll(): Promise<Array<User>> {
   return this._store;
  }

  async findManyAndLimit(limit: number, page: number): Promise<Array<User>> {
   const users = this._store.slice((page - 1) * limit, (limit * page));
   return users;
  }

  async updateById(id: number, update: any): Promise<Array<number | User>> {
   const user = this._store.find((u) => u.id === id);
   if (!user) {
    throw new CustomError(`User with id ${id} not found`, 404);
   }
   const index = this._store.indexOf(user);
   Object.keys(update).forEach((key) => {
    user[key] = update[key];
   });
   this._store.splice(index, 1, user);
   return [1, user];
  }

  async updateWhere(where: any, update: any): Promise<Array<number | User>> {
   const conditions = {};
   Object.keys(where).forEach((key) => {
    conditions[key] = where[key];
   });
   let matching: User[] = [];
   this._store.forEach((u) => {
    Object.keys(u).forEach((key) => {
     Object.keys(conditions).forEach((key2) => {
      if (key === key2 && u[key] === conditions[key2]) {
       matching = matching.concat([u]);
      }
     });
    });
   });
   if (matching.length === 0) {
    throw new CustomError("No matching user", 404);
   }
   const counts = {};
   let compare = 0;
   let matchingUser: User = null;
   matching.forEach((u) => {
    const _id = u.id;
    if (!counts[_id]) {
     counts[_id] = 1;
    } else {
     counts[_id] = counts[_id] + 1;
    }
    if (counts[_id] > compare) {
     compare = counts[_id];
     matchingUser = u;
    }
   });
   const index = this._store.indexOf(matchingUser);
   Object.keys(update).forEach((key) => {
    matchingUser[key] = update[key];
   });
   this._store.splice(index, 1, matchingUser);
   return [
    1, this._store.find((u) => u.id === matchingUser.id)
   ];
  }

  async deleteById(id: number): Promise<void> {
   const user = this._store.find((u) => u.id === id);
   if (!user) {
    throw new CustomError("User with specified id not found", 404);
   }
   this._store = this._store.filter((u) => u.id !== user.id);
   console.log("Deleted")
  }
}

export const DataStore = Store;
export default Store;
