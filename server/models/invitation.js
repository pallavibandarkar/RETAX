import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: "TeamSpace",
  },
  role: {
    enum: ["team admin", "sales", "support"],
    required: true,
  },
  invitedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    enum: ["Accepted", "Declined", "Pending"],
  },
});
