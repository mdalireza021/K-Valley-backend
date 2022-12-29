import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import db from './models/index.js';
import routers from './routes/user.route.js';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieSession(
    {
        name:"new-session",
        secret:"COOKIE_SECRET",
        httpOnly:true
    }
));

//mongodb connection
const mongoString=process.env.DATABASE_URL;

const Role=db.role;
db.mongoose.connect(mongoString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>
{
    console.log('connected to db');
    initial();

})
.catch((err)=>
{
    console.error('Error: ',err);
    process.exit();
})

app.use(routers);

app.get("/",(req,res)=>{
    res.json({Message:"Welcome!"});
})

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>
{
    console.log('server is running on http://localhost:'+PORT);
})


function initial()
{

    Role.estimatedDocumentCount((err,count)=>{

        if(!err && count===0)
        {
            new Role({
                name:"user"
            }).save(err=>{
                if(err)
                {
                    console.log("Error:"+err);
                }
                console.log("added user to roles collection");
            });

            new Role({
                name:"admin"
            }).save(err=>{
                if(err)
                {
                    console.log("error",err);
                }

                console.log("added admin to roles collection");
            });
        }

    })
}