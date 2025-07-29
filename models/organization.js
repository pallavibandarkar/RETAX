const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  admins: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  teamSpaces: [
    {
      type: Schema.ObjectId,
      ref: "TeamSpace",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Organization", organizationSchema);
