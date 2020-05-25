const express = require("express");
const router = express.Router();
const multer = require("multer");

// Projectimages Model
const Projectimages = require("../../models/ProjectImages");

// @route GET api/projects
// @desc Get All projectImages
// @acces Public
router.get("/", (req, res) => {
  Projectimages.find()
    .sort({ date: -1 })
    .then((projectimages) => res.json(projectimages));
});

// @route GET api/projects/:id
// @desc Get a projectImage
// @acces Public
router.get("/:id", (req, res) => {
  Projectimages.findById(req.params.id)
    .then((projectimage) => res.json(projectimage))
    .then((res) => console.log(res, "success"))
    .catch((error) => console.log(error, "error"));
});

// @route POST api/projectimages
// @desc Create A projectImage
// @acces Private
router.post("/", (req, res) => {
  const newProjectimages = new Projectimages({
    ...req.body,
  });

  newProjectimages.save().then((projectimages) => res.json(projectimages));
});

// @route DELETE api/projects/:id
// @desc DELETE A ProjectImage
// @acces Private
router.delete("/:id", (req, res) => {
  Projectimages.findById(req.params.id)
    .then((projectimage) =>
      projectimage.remove().then(() => res.json({ succes: true }))
    )
    .catch((err) => res.status(404).json({ succes: false }));
});

// upload files
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".jpg" || ".png")) {
      return cb(new Error("File must have a .jpg or png extension"));
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
      const projectimage = await Projectimages.findOne({ _id });
      if (!projectimage) {
        return res.status(404).send("Projectimages not found");
      }
      projectimage.images = req.file.buffer;

      await projectimage.save();
      res.send(projectimage);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
