const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  password2:{
    type:String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', UserSchema)
