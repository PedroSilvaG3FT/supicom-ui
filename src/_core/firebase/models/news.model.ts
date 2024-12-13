import { Timestamp } from "firebase/firestore";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";

export class NewsModel {
  public buildItem(model: INewsDB): INewsItem {
    return {
      ...model,
      id: String(model.id),
      updateDate: model.creationDate?.toDate(),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: INewsDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: INewsItem): INewsDB {
    return {
      id: model.id || "",
      active: model.active,
      title: model.title || {},
      author: model.author || "",
      content: model.content || {},
      imagesURL: model.imagesURL || [],
      imageBannerURL: model.imageBannerURL || "",

      updateDate: Timestamp.now(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(new Date(model.creationDate))
        : Timestamp.now(),
    };
  }
}
