import authJwt from "../middlewares/authJwt.js";
import {signIn,signUp,signOut} from '../controllers/auth.controller.js';
import {allAccess,userBoard,adminBoard} from '../controllers/user.controller.js';
import verifySignUp from "../middlewares/verifySignUp.js";

import express from 'express';

const routers=express.Router();
routers.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
    next();
});


///auth routers
routers.post("/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],signUp);
routers.post("/api/auth/signin",signIn);
routers.post("api/auth/signout",signOut);


///user routers
routers.get("/api/test/all",allAccess);

routers.get("/api/test/user",[authJwt.verifyToken],userBoard);

routers.get("/api/test/admin",[authJwt.verifyToken,authJwt.isAdmin],adminBoard);

export default routers;
