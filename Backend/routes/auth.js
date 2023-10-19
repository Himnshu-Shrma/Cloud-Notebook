const express = require('express')
const router = express.Router()
const User = require('../models/User');
//helps in salting the password
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
//to check whether the token genrated has been changed or not
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');
const JWT_SECRET = 'Howyoudoing';

//Route 1
// First EndPoint
//Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {
   //if there are errors then return bad errors and errors
   let success=false;//will be used later in frontend
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   try {
      //check whether the user withh this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({success, error: "Sorry a user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      });
      //sending id 
      const data = {
         user: {
            id: user.id
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authToken});
      //jwt.verify will check if something is changed or not 
      // .then(user=>res.json(user));
      // res.json({"Process":"Sucess"})
      // res.json(user)
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Some error occured" })
   }

})

//Route 2
//Second Endpoint
// Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Enter valid password').exists(),
], async (req, res) => {
   //if there are errors then return bad errors and errors
   let success=false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   const {email,password}=req.body;//getting email and password
   try{
      let user=await User.findOne({email})
      if(!user){
         return res.status(400).json({success,error:"Sorry email doesn't exists"})
      }

      //comparing password
      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
         return res.status(400).json({success,error:"! Incorrect password"})
      }
      //sending user's id if password is correct
      const data = {
         user: {
            id: user.id
         }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authToken});

   }catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server Error" )
   }

})


//Route 3
//Endpoint THird
// Get logged in user's details: POST "api/auth/getuser", Login required
router.post('/getuser',fetchuser, async (req, res) => {

try{
   const userid=req.user.id;
   const user =await User.findById(userid).select("-password");//Here we are getting user's data except password using user's id
   res.send(user);
}catch (error) {
   console.error(error.message);
   res.status(500).json("Internal server Error" )
}
})
module.exports = router
