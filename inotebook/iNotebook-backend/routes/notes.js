const express = require("express");
const {body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// Route 1: Get all hte notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 2: Add another note
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
        min: 5,
    }),
    (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = note.save();
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    },
]);
// Route 3: Update note 
router.put('/updatenote/:d', fetchuser, async (req, res) =>{
    const {title, description, tag} = req.body;
    //Create a new note object
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return  res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true} )
    res.json({note});

})

//Route 4: delete note

router.delete('/deletenote/:d', fetchuser, async (req, res) =>{
    

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return  res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"success": "note has been deleted", note: note});

})
module.exports = router;
