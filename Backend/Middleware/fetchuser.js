// When ever and where ever we want ot fetch data of user then we will be using this middleware

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Howyoudoing';

// we just need to write this ftechuser as second argument when we need login info
const fetchuser=(req,res,next)=>{//next will  call the next functionin the queue(eg. async(req,res))
    //Get the user from jwt token and add it to req object
    const token=req.header('auth-token');//this wil be included in header of get user endpoint
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try{
        const data =jwt.verify(token,JWT_SECRET);
        req.user= data.user;
        next();
    }catch(error){
        res.status(401).send({error:"Some error occured"});
    }
}


module.exports=fetchuser