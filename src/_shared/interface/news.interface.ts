import { Timestamp } from "firebase/firestore";
import { IBaseLocaleDB } from "./locale.interface";

export interface INewsDB {
  id?: string;
  author: string;
  active: boolean;
  title: IBaseLocaleDB;
  content: IBaseLocaleDB;
  imageBannerURL: string;

  updateDate: Timestamp;
  creationDate: Timestamp;
}

export interface INewsItem
  extends Omit<INewsDB, "creationDate" | "updateDate"> {
  updateDate: Date;
  creationDate: Date;
}
