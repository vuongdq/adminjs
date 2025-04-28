const mongoose = require('mongoose');

const playHistorySchema = new mongoose.Schema({
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
  play_time: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const PlayHistory = mongoose.model('PlayHistory', playHistorySchema);

module.exports = PlayHistory; 