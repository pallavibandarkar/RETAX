import mongoose from "mongoose";

const teamSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  organizationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Organization",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TeamSpace = mongoose.model("TeamSpace", teamSpaceSchema);

export default TeamSpace;
