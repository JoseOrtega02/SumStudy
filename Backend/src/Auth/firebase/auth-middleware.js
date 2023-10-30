import admin from './index.js'

export default function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization

  if (!headerToken) {
    return response.status(401).json({ message: 'No token provided' })
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return response.status(401).json({ message: 'Invalid token' })
  }

  const token = headerToken.split(' ')[1]

  admin
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => response.status(403).json({ message: 'Could not authorize' }))
}
