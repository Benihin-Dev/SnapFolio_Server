const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const snapfolioUserSchema = new Schema(
  {
    about: {
      type: Object,
      required: true,
      properties: {
        userid: { type: String },
        name: { type: String },
        titleName: { type: String },
        description: { type: String },
        profile: { type: String },
        cv: { type: String },
      },
    },
    eduSkills: {
      type: Object,
      required: true,
      properties: {
        education: {
          type: [Object],
          required: true,
          of: {
            title: { type: String },
            place: { type: String },
            description: { type: String },
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          },
        },
        skills: {
          type: [Object],
          required: true,
          of: {
            title: { type: String },
            description: { type: String },
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          },
        },
        projects: {
          type: [Object],
          required: true,
          of: {
            title: { type: String },
            description: { type: String },
            projectLink: { type: String },
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          },
        },
      },
    },
    contacts: {
      type: Object,
      required: true,
      properties: {
        email: { type: String },
        phone: { type: String },
        linkedin: { type: String },
        github: { type: String },
        whatsapp: { type: String },
        instagram: { type: String },
      },
    },
    experience: {
      type: [Object],
      required: true,
      of: {
        title: { type: String },
        year: { type: String },
        description: { type: String },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    },
  },
  { timestamps: true }
);

// **Auto-generate IDs for all nested objects:**
snapfolioUserSchema.pre("save", function (next) {
  const self = this; // Reference the document being saved

  // Ensure _id is auto-generated for all nested objects with required _id properties:
  const nestedObjects = [
    self.about,
    ...self.eduSkills.education,
    ...self.eduSkills.skills,
    ...self.eduSkills.projects,
    ...self.experience,
  ];

  nestedObjects.forEach((obj) => {
    if (obj._id === undefined || obj._id === null) {
      obj._id = new mongoose.Types.ObjectId();
    }
  });

  next();
});

module.exports = mongoose.model("snaPFolioUser", snapfolioUserSchema);
