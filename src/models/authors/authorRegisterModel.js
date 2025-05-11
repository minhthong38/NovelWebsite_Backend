const mongoose = require("mongoose");

const authorRegisterSchema = new mongoose.Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {type: String,enum: ["pending", "approved", "rejected"],default: "pending",required: true}
  },
  { timestamps: true, collection: "RegisterAuthors" }
);

module.exports = mongoose.model("RegisterAuthor", authorRegisterSchema);
