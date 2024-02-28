const userModel = require("./model&schema");
const mongoose = require("mongoose");

// create New User - POST
const addnewuser = async (req, res) => {
  const { about, eduSkills, contacts, experience } = req.body;
  try {
    const user = await userModel.create({
      about,
      eduSkills,
      contacts,
      experience,
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// get all user data - GET
const getalluser = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// get a specific user data - GET
const getuser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOne({ "about.userid": id });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


// // delete user - DELETE
const deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOneAndDelete({ "about.userid": id }, {});
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { addnewuser, getalluser, getuser, deleteuser };
