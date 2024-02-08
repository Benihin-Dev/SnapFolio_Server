const express = require("express");
const { addnewuser,getalluser,getuser,updateuser, deleteuser } = require("./userController");
const router = express.Router();

router.post("/", addnewuser);
router.get("/", getalluser);
router.get("/:id", getuser);
router.patch("/:id",updateuser);
router.delete("/:id",deleteuser);


module.exports = router;
