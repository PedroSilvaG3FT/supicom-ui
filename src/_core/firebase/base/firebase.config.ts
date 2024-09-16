import { enviroments } from "@/env/enviroments";

export const FIREBASE_CONFIG = {
  appId: enviroments.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: enviroments.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: enviroments.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: enviroments.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: enviroments.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: enviroments.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
