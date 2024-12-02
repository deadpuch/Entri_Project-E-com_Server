import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  User_name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    unique: true,
    required: true,
  },

  password:{
    type:String,
    required:true,
    minLength:6,
  },

  profilePic:{
    type:String,
    default:"https://www.vecteezy.com/vector-art/20765399-default-profile-account-unknown-icon-black-silhouette"
  },

  Active:{
    type:Boolean,
    default:true
  }


},

{
    timestamps:true
}

);

export const User=mongoose.model("users",userSchema)
