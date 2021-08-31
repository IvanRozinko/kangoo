const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  history: [{ type: Types.ObjectId, ref: 'Training' }],
  allowNotifications: { type: Boolean, default: true },
  subscription: { 
    endpoint: { type: String },
    keys: {
      p256dh: { type: String },
      auth: { type: String }
    }
  }
})

schema.set('toJSON', {
  transform: (doc, ret, options) => {
    const {password, _id, ...rest } = ret;
    return {
      id: _id,
      ...rest
    } 
  }
})

module.exports = model("User", schema)