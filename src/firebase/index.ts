import admin from "firebase-admin";
import {getApps} from 'firebase-admin/app';
import serviceAccount from '@/firebase/config'

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

export const firestore = admin.firestore();
