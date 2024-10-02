import {
  IContactDB,
  IContactItem,
} from "@/_shared/interface/contact.interface";
import { Timestamp } from "firebase/firestore";

export class ContactModel {
  public buildItem(model: IContactDB): IContactItem {
    return {
      ...model,
      id: String(model.id),
      name: model.name,
      email: model.email,
      status: model.status,
      phoneNumber: model.phoneNumber,
      description: model.description,
      updateDate: model.creationDate?.toDate(),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IContactDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IContactItem): IContactDB {
    return {
      id: model.id || "",
      name: model.name || "",
      email: model.email || "",
      status: model.status || "",
      phoneNumber: model.phoneNumber || "",
      description: model.description || "",

      updateDate: Timestamp.now(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(new Date(model.creationDate))
        : Timestamp.now(),
    };
  }
}
