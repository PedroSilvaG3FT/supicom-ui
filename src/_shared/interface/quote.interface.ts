import { Timestamp } from "firebase/firestore";
import { IProductItem } from "./product.interface";

export interface IQuoteCustomer {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

export interface IQuoteDB {
  id?: string;
  note: string;
  status: string;
  observation: string;
  productsSlug: string[];
  responsibleName: string;
  customer: IQuoteCustomer;

  updateDate: Timestamp;
  creationDate: Timestamp;
}

export interface IQuoteItem
  extends Omit<IQuoteDB, "creationDate" | "updateDate"> {
  updateDate: Date;
  creationDate: Date;
  products: IProductItem[];
}
