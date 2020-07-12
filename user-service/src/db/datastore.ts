import { User } from "./model";

class DataStore {
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
   return this._store.concat([user]).find((u) => u.id === id);
  }

  async findById(id: number): Promise<User> {
   return this._store.find((user) => user.id === id);
  }

  async findAll(): Promise<Array<User>> {
   return this._store;
  }

  async findManyAndLimit(limit: number, page: number): Promise<Array<User>> {
   const users = this._store.slice((page - 1) * limit, (limit * page) - 1);
   return users;
  }
}