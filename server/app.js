const express = require('express');
const config = require('config')
const mongoose = require('mongoose');
const webpush = require('web-push')
const dotenv = require('dotenv')

const app = express();

dotenv.config();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/training', require('./routes/training.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/notifications', require('./routes/subscription.routes'))

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    mongoose.set('debug', true)

    webpush.setVapidDetails(
      process.env.WEB_PUSH_CONTACT,
      process.env.PUBLIC_VAPID_KEY, 
      process.env.PRIVATE_VAPID_KEY
    )

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start();

