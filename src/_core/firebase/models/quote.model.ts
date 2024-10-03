import { Timestamp } from "firebase/firestore";
import useProductData from "@/_shared/hooks/data/product.hook";
import { IQuoteDB, IQuoteItem } from "@/_shared/interface/quote.interface";

export class QuoteModel {
  public buildItem(model: IQuoteDB): IQuoteItem {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const products = useProductData().products.filter((item) => {
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

  public buildList(model: IQuoteDB[]) {
    return model.map((item) => this.buildItem(item));
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
