
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    
    image: {
      type: String,
      trim: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Status = mongoose.model("status", statusSchema);
module.exports = Status;
