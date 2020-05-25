const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Annotations Model
const Annotations = require("../../models/annotation");

// @route GET api/projects
// @desc Get All projectImages
// @acces Public
router.get("/", (req, res) => {
  Annotations.find()
    .sort({ date: -1 })
    .then((annotations) => res.json(annotations));
});

// @route GET api/projects/:id
// @desc Get a projectImage
// @acces Public
router.get("/:id", (req, res) => {
  Annotations.findById(req.params.id)
    .then((annotation) => res.json(annotation))
    .then((res) => console.log(res, "success"))
    .catch((error) => console.log(error, "error"));
});

// @route POST api/projectimages
// @desc Create A projectImage
// @acces Private
router.post("/", (req, res) => {
  const newAnnotations = new Annotations({
    ...req.body,
  });

  newAnnotations.save().then((annotations) => res.json(annotations));
});

// @route DELETE api/projects/:id
// @desc DELETE A ProjectImage
// @acces Private
router.delete("/:id", (req, res) => {
  Annotations.findById(req.params.id)
    .then((annotation) =>
      annotation.remove().then(() => res.json({ succes: true }))
    )
    .catch((err) => res.status(404).json({ succes: false }));
});

module.exports = router;
