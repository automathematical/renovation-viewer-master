const mongoose = require("mongoose");

const projectimagesSchema = new mongoose.Schema(
  {
    project_id: {
      type: String,
      required: true,
      trim: true,
    },
    // step II upload files
    images: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const Projectimage = mongoose.model("Projectimages", projectimagesSchema);

module.exports = Projectimage;
