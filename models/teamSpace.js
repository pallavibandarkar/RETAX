const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSpaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  organizationId: {
    type: Schema.ObjectId,
    ref: "Organization",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TeamSpace", teamSpaceSchema);
