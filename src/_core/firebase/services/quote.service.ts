import { QuoteModel } from "../models/quote.model";
import { FirebaseCollectionBase } from "../base/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";

export class QuoteService extends FirebaseCollectionBase {
  _model = new QuoteModel();

  constructor() {
    super(FIREBASE_COLLECTION.quote);
  }
}
