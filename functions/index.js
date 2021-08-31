const express = require('express');
const mongoose = require('mongoose');
const webpush = require('web-push')
const dotenv = require('dotenv')
const path = require('path')
const functions = require('firebase-functions')
const { config } = require('./config')

const app = express();

dotenv.config();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/training', require('./routes/training.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/notifications', require('./routes/subscription.routes'))

app.use('/', express.static(path.join(__dirname, 'build')))

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "custom-sw.js"));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

const PORT = config.port || 5000;

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    // mongoose.set('debug', true)

    webpush.setVapidDetails(
      config.WEB_PUSH_CONTACT,
      config.PUBLIC_VAPID_KEY, 
      config.PRIVATE_VAPID_KEY
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

exports.app = functions.https.onRequest(app)