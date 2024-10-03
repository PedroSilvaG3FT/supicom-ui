import { NewsModel } from "../models/news.model";
import { FirebaseCollectionBase } from "../base/firebase-collection.base";
import { FIREBASE_COLLECTION } from "../constans/firebase-collection.contant";

export class NewsService extends FirebaseCollectionBase {
  _model = new NewsModel();

  constructor() {
    super(FIREBASE_COLLECTION.news);
  }
}
