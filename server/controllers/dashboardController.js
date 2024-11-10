const Note = require('../models/Notes');
const mongoose = require('mongoose');
exports.dashboard = async (req, res)=>{
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
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
                title: "ANOTHER ACCOUNT",
                body: "HI THERE THIS NOTE IS ON ANOTHER ACCOUNT",
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
