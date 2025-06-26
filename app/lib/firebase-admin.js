import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://huru-app-7a0ee.firebaseio.com',
      // databaseURL: 'https://huru-admin-app.firebaseio.com',
    });
  } catch (error) {
    console.error('initialization error', error.stack);
  }
}

export default admin.firestore();
