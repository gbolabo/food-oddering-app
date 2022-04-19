import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      img: { type: String },
      firstname: { type: String},
      lastname: { type: String},
      Address: { type: String, maxlength: 200}
    },
    
    { timestamps: true }
  );
  
  export default mongoose.models.User ||  mongoose.model("User", UserSchema);
  