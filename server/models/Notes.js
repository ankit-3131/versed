const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
      user: {
        type: Schema.ObjectId,
        ref: 'User',
      },
      album:{
        type: String,
        default: "Album Name",
      },

      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now()
      },
      priority:{
        type: String,
        default: "Low",
      },
      coverImage: {
        type: String,
        default: 'default.jpeg',
      },
      // updatedAt: {
      //   type: Date,
      //   default: Date.now()
      // }
    }, {timestamps: true});
    
    module.exports = mongoose.model('Note', NoteSchema);