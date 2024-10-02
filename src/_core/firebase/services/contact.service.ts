import { ContactModel } from "../models/contact.model";
import { FirebaseCollectionBase } from "../base/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";

export class ContactService extends FirebaseCollectionBase {
  _model = new ContactModel();

  constructor() {
    super(FIREBASE_COLLECTION.contact);
  }
}
