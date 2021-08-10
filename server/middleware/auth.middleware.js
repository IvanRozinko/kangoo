const jwt = require('jsonwebtoken')
const config = require('config');
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request')
    return next()
  }

  try {

    const token = req.headers.authorization.split(' ')[1] // Bearer token

    if(!token) {
      return res.status(401).json({ message: 'Немає авторизації'})
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded;
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Немає авторизації'})
  }
}