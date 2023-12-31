import admin from 'firebase-admin'
import serviceAccount from './credentials.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<yourproject>.firebaseio.com'
})

export default admin
