import mongoose from "mongoose";

const adCarosalSchema = mongoose.Schema({
  img: {
    type: String,
    default:
      "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
  },
});

export const MOBILECAROSAL = mongoose.model("mobile_ad_carosal", adCarosalSchema);
