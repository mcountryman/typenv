
export interface ICustomMetadata {
  /**
   * Configuration property key name
   */
  key: string,
  /**
   * Default value
   */
  default: any,
  /**
   * Is property optional
   */
  optional: boolean,
}

export interface IMetadata extends ICustomMetadata {
  /**
   * Property name
   */
  propertyName: string,
  /**
   * Property type
   */
  propertyType: any,
}
