const express = require("express");

const { createComment, getComment, deleteComment, updateComment } = require("../controllers/commentControllers");

//Import isoOwnerOrAdmin function from blogMiddleware
//Write code here.

const router = express.Router();

router.get("/:id", getComment);
router.post("/create", createComment);

//Add comment Protection to delete and patch route.

router.delete("/delete/:id", /*... */, deleteComment);
router.patch("/update/:id", /*... */, updateComment);

module.exports = router;