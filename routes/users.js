var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");

const varifyEmail = (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z.]+$/;
  if (!emailRegex.test(req.body.email))
    return res.status(400).send({ error: "Invalid Email Address!" });
  next();
};

/* GET users listing. */
router.get("/", userController.getUsers);
/**
 * GET user by its ID
 */
router.get("/:id", userController.getUserById);
/**
 * POST a new user
 */
router.post("/add", varifyEmail, userController.createUser);

/**
 * Update user by its ID
 */

router.put("/:id/update", userController.updateUser);

/**
 * DELETE a user
 */
router.delete("/:id/delete", userController.deleteUser);

module.exports = router;
