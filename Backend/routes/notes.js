const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchuser = require('../Middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// Route 1
//Endpoint One

//Get all the Notes of using: GET "/api/notes/fetchallnotes". User alreaddy logged in
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.json(notes)

   } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server Error")
   }
})
//Route 2
//Endpoint Two
//Add a new Note using: POST "/api/notes/addnote". User alreaddy logged in
router.post('/addnote', fetchuser, [
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Enter valid description').isLength({ min: 5 }),
], async (req, res) => {
   try {
      const { title, description, tag } = req.body;//getting title, description and tag
      //if there are errors then return bad errors and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const savedNote = await note.save();
      res.json(savedNote);
   } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server Error")
   }
})

//Route 3
//Endpoint Three
//Update a Note using: PUT "/api/notes/updatenote". User alreaddy logged in
router.put('/updatenote/:id', fetchuser, async (req, res) => {//Here we are providing id of note
   try {
      const { title, description, tag } = req.body;//getting title, description and tag
      //create a newNote object and replace it with previous to update the note
      const newNote = {};
      if (title) {
         newNote.title=title
      };
      if (description) {
         newNote.description=description
      };
      if (tag) {
         newNote.tag=tag
      };

      let note =await Note.findById(req.params.id);
      if(!note){
         return res.status(404).send("No Note found");
      }

      // Check if note exists for this user or not
      if(note.user.toString()!==req.user.id){
         return res.status(401).send("Action Not Allowed");
      }

      note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      
      res.json(note);
   } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server Error")
   }
})

//Route 4
//Endpoint Four
//delete a Note using: DELETE "/api/notes/deletenote". User alreaddy logged in
router.delete('/deletenote/:id', fetchuser, async (req, res) => {//Here we are providing id of note
   try {
      const { title, description, tag } = req.body;//getting title, description and tag
      //create a newNote object and replace it with previous to update the note
      
      //Find the note and delete it
      let note =await Note.findById(req.params.id);
      if(!note){
         return res.status(404).send("No Note found");
      }

      // Check if note exists for this user or not
      if(note.user.toString()!==req.user.id){
         return res.status(401).send("Action Not Allowed");
      }

      note =await Note.findByIdAndDelete(req.params.id);
      
      res.json({"Sucess":"Note has been deleted"});
   } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server Error")
   }
})

module.exports = router
