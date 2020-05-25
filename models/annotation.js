const mongoose = require("mongoose");

const selectionSchema = new mongoose.Schema({
  anchorX: {
    type: Number,
    required: true,
    trim: true,
  },
  anchorY: {
    type: Number,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    required: true,
    trim: true,
  },
  showEditor: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

const geometryShema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  width: {
    type: Number,
    required: true,
    trim: true,
  },
  x: {
    type: Number,
    required: true,
    trim: true,
  },
  y: {
    type: Number,
    required: true,
    trim: true,
  },
});

const dataSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const annotationShema = new mongoose.Schema(
  {
    selection: selectionSchema,
    geometry: geometryShema,
    data: dataSchema,
  },
  {
    timestamps: true,
  }
);

const Annotations = mongoose.model("Annotations", annotationShema);

module.exports = Annotations;
