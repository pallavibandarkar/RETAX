import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  teamSpaces: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TeamSpace",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
