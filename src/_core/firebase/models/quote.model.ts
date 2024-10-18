import { Timestamp } from "firebase/firestore";
import { IProductItem } from "@/_shared/interface/product.interface";
import { IQuoteDB, IQuoteItem } from "@/_shared/interface/quote.interface";

export class QuoteModel {
  public buildItem(model: IQuoteDB, allProducts: IProductItem[]): IQuoteItem {
    const products = allProducts.filter((item) => {
      return model.productsSlug.includes(item.slug);
    });

    return {
      ...model,
      products,
      id: String(model.id),
      updateDate: model.creationDate?.toDate(),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IQuoteDB[], allProducts: IProductItem[]) {
    return model.map((item) => this.buildItem(item, allProducts));
  }

  public buildRegisterDTO(model: IQuoteItem): IQuoteDB {
    return {
      id: model.id || "",
      note: model.note || "",
      status: model.status || "",
      observation: model.observation || "",

      customer: model.customer,
      productsSlug: model.productsSlug,

      updateDate: Timestamp.now(),
      creationDate: model.creationDate
        ? Timestamp.fromDate(new Date(model.creationDate))
        : Timestamp.now(),
    };
  }
}
