import { IMetadata } from "../../reflector";

export class ValueParser {
  /**
   * Parse string value using `metadata.propertyType`
   * @param meta
   * @param value
   */
  public parse(meta: IMetadata, value: string): any {
    switch (meta.propertyType) {
      case Date:
        return new Date(value);
      case Number:
        return parseFloat(value);
      case String:
        // TODO: Parse quotes
        return value;
      default:
        return JSON.parse(value);
    }
  }
}
