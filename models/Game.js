const mongoose = require('mongoose');
const path = require('path');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  file_url: {
    type: String,
    required: true,
    set: function(val) {
      if (val && val.path) {
        return path.basename(val.path);
      }
      return val;
    }
  },
  thumbnail_url: {
    type: String,
    required: true,
    set: function(val) {
      if (val && val.path) {
        return path.basename(val.path);
      }
      return val;
    }
  }
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 