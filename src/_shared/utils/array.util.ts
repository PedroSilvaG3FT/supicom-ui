export class ArrayUtil {
  public static removeByIndex<Data>(data: Data[], index: number) {
    return data.filter((_, i) => i !== index);
  }
}
