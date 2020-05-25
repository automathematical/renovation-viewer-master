const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");

// Project Model
const Project = require("../../models/ProjectModel");

// @route GET api/projects
// @desc Get All projects
// @acces Public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects));
});

// @route GET api/projects/:id
// @desc Get a project
// @acces Public
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    //.then(res => console.log(res, "success"))
    .catch((error) => console.log(error, "error"));
});

// @route POST api/projects
// @desc Create A PROJECT
// @acces Private
router.post("/", (req, res) => {
  const newProject = new Project({
    ...req.body,
  });

  newProject.save().then((project) => res.json(project));
});

// @route DELETE api/projects/:id
// @desc DELETE A Project
// @acces Private
router.delete("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ succes: true })))
    .catch((err) => res.status(404).json({ succes: false }));
});

// upload files
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".jpg")) {
      return cb(new Error("File must have a .jpg extension"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/:id/upload",
  upload.single("file"),
  async (req, res) => {
    const _id = req.params.id;
    try {
      const project = await Project.findOne({ _id });
      if (!project) {
        return res.status(404).send("Project not found");
      }
      project.image = req.file.buffer;

      await project.save();
      res.send(project);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
