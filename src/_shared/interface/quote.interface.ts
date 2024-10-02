import { Timestamp } from "firebase/firestore";
import { IProductItem } from "./product.interface";

export interface IQuoteCustomer {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IQuoteDB {
  id?: string;
  status: string;
  observation: string;
  productsSlug: string[];
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
