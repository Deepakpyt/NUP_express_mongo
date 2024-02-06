var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ message: "No user found" });
  } else {
    res.status(200).json(users);
  }
});
/**
 * GET user by its ID
 */
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findById(id);
    if (!user) {
      throw "User not found";
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
});
/**
 * POST a new user
 */
router.post("/add", async (req, res) => {
  let { firstname, lastname, email, password } = req.body;

  try {
    let newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
});

/**
 * Update user by its ID
 */

router.put("/:id/update", async (req, res) => {
  let updateData = req.body;
  let id = req.params.id;

  try {
    let updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw "no user with this ID";
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
});

/**
 * DELETE a user
 */
router.delete("/:id/delete", async (req, res) => {
  let id = req.params.id;

  try {
    let deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("No user found");
    }
    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
