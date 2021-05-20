const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const reqString = {
    'type': String,
    'required': true
}

const logsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: reqString,

  moderationlogs: {
    'type': String,
    'required': true,
    'default': defaults.moderationlogs
  },
  messagelogs: {
    'type': String,
    'required': true,
    'default': defaults.messagelogs
  },
  channellogs: {
    'type': String,
    'required': true,
    'default': defaults.channellogs
  },
  rolelogs: {
    'type': String,
    'required': true,
    'default': defaults.rolelogs
  },
  memberlogs: {
    'type': String,
    'required': true,
    'default': defaults.memberlogs
  }
});

module.exports = mongoose.model("Logs", logsSchema);