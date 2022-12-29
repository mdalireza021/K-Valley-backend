import mongoose from "mongoose";
mongoose.Promise=global.Promise;
mongoose.set('strictQuery',false);
const db={};
db.mongoose=mongoose;

import User from './user.model.js';
import Role from "./role.model.js";
db.user=User;
db.role=Role;

db.ROLES=["user","admin"];

export default db;
