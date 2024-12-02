import mongoose from "mongoose";

const salesModel=mongoose.Schema({
    name: {
        type: String,
        required: true,
      },

    company_name: {
        type: String,
        required: true,
        unique:true
      },

    mobile: {
        type: Number,
        required: true,
      },

    GST_no: {
        type: String,
        required: true,
      },
    
      Email: {
        type: String,
        required: true,
        unique: true,
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
    timestamps: true,
})

export const SELLER=mongoose.model("salesusers",salesModel)

