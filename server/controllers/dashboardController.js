const Note = require('../models/Notes');
const mongoose = require('mongoose');

//
exports.dashboard = async (req, res)=>{
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    // const result = await Note.deleteMany({ user: "67303af342cec86248155141" }); 
    // const result = await Note.deleteMany({ user: "6728fe279856ffaacb1dcf2f" }); 
    async function insertDummyData(){
    try{
        await Note.insertMany([
            {
                user:"6728fe279856ffaacb1dcf2f",
                title: "Butterflies are Good",
                body: "HI THERE THIS IS MY FIRST NOTE AND NOTHING ELSE",
                createdAt: new Date(),
            },
            {
                user:"67303af342cec86248155141",
                title: "Treat Me Better",
                body: "I wont lie to you I know hes just not right for you And you can tell me if Im off...",
                createdAt: new Date(),
            },
        ])
    }
    catch(error){
        console.log(error);
    }
}
    // insertDummyData();

    const locals = {
        pageTitle: "Dashboard",
        description: "Dashboard page"
    }

    // const notes = await Note.find({user: "6728fe279856ffaacb1dcf2f"}).sort({createdAt: -1}).
    try{
      const notes = await Note.find({user: req.user}).sort({createdAt:-1});
      const user = req.user;
      var flag = req.cookies?.flag || 100;
      var content = req.cookies?.content || "Done!";
      res.clearCookie('flag');
      res.clearCookie('content');
    res.render('dashboard/index', {
      user,
      locals,
      notes,
      flag,
      content,
      layout: "../views/layouts/dashboard",
    });
    }
    catch(error){
      console.log("Error", error);
    }
    };
    //view note

    exports.dashboardViewNote = async(req,res)=>{
      try{
          console.log("fetching note")
          // const note = await Note.findById({ _id: req.params.id }).where({user: req.user.id}).lean();
          const note = await Note.findById({ _id: req.params.id }).lean();
          console.log("fetched note")
          if(note){
            res.render('dashboard/view-note', {
              noteID: req.params.id,
              note,
              layout: '../views/layouts/dashboard'
            })
            console.log("served note")
          }
          else{
            res.status(404).send("Note not found");
          }
        }
        catch(error){
          console.log("Error", error);
        }
    }

    //update note code

    exports.dashboardUpdateNote = async(req,res)=>{
      try{
        await Note.findOneAndUpdate(
          { _id: req.params.id},
          { title: req.body.title, body: req.body.body }
        );
        res.cookie('flag', 1, { 
          maxAge: 2000, 
        });
        res.cookie('content', "Updated the note Successfully!",  { 
          maxAge: 2000, 
        });
        res.redirect('/dashboard')
      } catch(error){
        console.log(error);
      }
    }

    //delete note code

    exports.dashboardDeleteNote = async(req,res)=>{
      try{
        await Note.deleteOne({ _id: req.params.id});
        res.cookie('flag', 1, { 
          maxAge: 2000, 
        });
        res.cookie('content', "Deleted the note Successfully!",  { 
          maxAge: 2000, 
        });
        return res.redirect('/dashboard');
      }
      catch(error){
        console.log(error);
      }
    }

    //add note
    
    exports.dashboardAddNote =  async(req, res)=>{
      try{
        const title = req.body.title;
        const body = req.body.body;
        const userNow = req.user;

        const addedNote = Note.create({
          title: title,
          body: body,
          user: userNow,
        })
        const locals = {
          pageTitle: "Add Note",
          description: "Add a New Note"
      }
      res.cookie('flag', 1, { 
        maxAge: 2000, 
      });
      res.cookie('content', "Added your new note!",  { 
        maxAge: 2000, 
      });
      res.redirect('/dashboard')}
      catch(error){
        console.log(`error in creating the note`,error);
      }
    }
