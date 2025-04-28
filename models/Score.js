const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score; 