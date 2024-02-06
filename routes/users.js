var express = require("express");
var router = express.Router();
var userController = require('../controller/userController')

/* GET users listing. */
router.get("/", userController.getUsers);
/**
 * GET user by its ID
 */
router.get("/:id", userController.getUserById);
/**
 * POST a new user
 */
router.post("/add", userController.createUser);

/**
 * Update user by its ID
 */

router.put("/:id/update", userController.updateUser);

/**
 * DELETE a user
 */
router.delete("/:id/delete", userController.deleteUser);

module.exports = router;
