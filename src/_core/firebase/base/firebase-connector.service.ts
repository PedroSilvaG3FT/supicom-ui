import { FIREBASE_CONFIG } from "./firebase.config";
import { getApps, initializeApp } from "firebase/app";

export class FirebaseConnectorService {
  public app = !getApps().length
    ? initializeApp(FIREBASE_CONFIG)
    : getApps()[0];
}
