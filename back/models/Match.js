const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  location: {
    name: { type: String, required: true },
    address: { type: String }
  },
  players: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Finished', 'Cancelled']
  }
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;
