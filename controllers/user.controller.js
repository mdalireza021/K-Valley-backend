const allAccess=(req,res)=>{
    res.status(200).send("public content");
};

const userBoard=(req,res)=>
{
    res.status(200).send("User content");
};
const adminBoard=(req,res)=>
{
    res.status(200).send("Admin Content");
}

export {allAccess,userBoard,adminBoard};

