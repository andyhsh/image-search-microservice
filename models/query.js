const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema({
  term: String,
  when: { type: Date, default: Date.now() }
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
