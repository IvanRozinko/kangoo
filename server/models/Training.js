const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  datetime: { type: Date, required: true, unique: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  location: { type: String }
})

module.exports = model("Training", schema)