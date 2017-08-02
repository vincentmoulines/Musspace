const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //role: String,
  imgUrl: {
    type: String,
    default:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  role: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
