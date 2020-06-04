import "reflect-metadata";

const CONFIG_PROPERTY_NAME = "typenv:config";

export interface ICustomPropertyInfo {
  name: string,
  default: any,
  optional: boolean,
}

export interface IPropertyInfo extends ICustomPropertyInfo {
  propertyName: string,
  propertyType: any,
}

export const ConfigProperty = (name: string, defaultValue: any = null, optional: boolean = false) => {
  return Reflect.metadata(
    CONFIG_PROPERTY_NAME,
    { name, default: defaultValue, optional } as ICustomPropertyInfo
  );
};

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getPropertyInfo(target: TConfig, propertyName: string): IPropertyInfo;
  getAllPropertyInfo(target: TConfig): IPropertyInfo[];
}

export class ConfigReflector<TConfig> implements IConfigReflector<TConfig> {
  constructor(private readonly _ctor: { new(): TConfig }) {}

  public create(): TConfig {
    return new this._ctor();
  }

  public getPropertyInfo(target: TConfig, propertyName: string): IPropertyInfo {
    const info: ICustomPropertyInfo = Reflect.getMetadata(
      CONFIG_PROPERTY_NAME,
      target,
      propertyName,
    );

    const propertyType: any = Reflect.getMetadata(
      "design:type",
      target,
      propertyName,
    );

    return {
      ...info,
      propertyType,
      propertyName,
    }
  }

  public getAllPropertyInfo(target: TConfig): IPropertyInfo[] {
    return Object
      .getOwnPropertyNames(target)
      .map(key => this.getPropertyInfo(target, key))
    ;
  }
}
