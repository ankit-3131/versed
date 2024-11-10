const Note = require('../models/Notes');
const mongoose = require('mongoose');
exports.dashboard = async (req, res)=>{
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    async function insertDummyData(){
    try{
      // const result = await Note.deleteMany({ user: "67303af342cec86248155141" }); 
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
    insertDummyData();
    const locals = {
        pageTitle: "Dashboard",
        description: "Dashboard page"
    }

    // const notes = await Note.find({user: "6728fe279856ffaacb1dcf2f"}).sort({createdAt: -1}).
    try{
      const notes = await Note.find({user:"67303af342cec86248155141"});
      const user = req.user;
    res.render('dashboard/index', {
      user,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
    }
    catch(error){
      console.log("Error", error);
    }
    };

    exports.dashboardViewNote = async(req,res)=>{
      const note = await Note.findById({ _id: req.params.id }).where({user: req.user.id}).lean();

      if(note){
        res.render('dashboard/view-note', {
          noteID: req.params.id,
          note,
          layout: '../views/layouts/dashboard'
        })
      }
    }
    exports.dashboardUpdateNote = async(req,res)=>{
      try{
        await Note.findOneAndUpdate(
          { _id: req.params.id},
          { title: req.body.title, body: req.body.body }
        ).where( {user: req.user.id} );
        res.redirect('/dashboard')
      } catch(error){
        console.log(error);
      }
    }

    //delete note code

    exports.dashboardDeleteNote = async(req,res)=>{
      try{
        await Note.deleteOne({ _id: req.params.id}).where({user: req.user.id});
        res.redirect('/dashboard');
      }
      catch(error){
        console.log(error);
      }
    }
