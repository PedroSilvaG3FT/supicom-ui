import { Timestamp } from "firebase/firestore";

export interface IContactDB {
  id?: string;
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  description: string;

  updateDate: Timestamp;
  creationDate: Timestamp;
}

export interface IContactItem
  extends Omit<IContactDB, "creationDate" | "updateDate"> {
  updateDate: Date;
  creationDate: Date;
}
