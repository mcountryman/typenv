import "reflect-metadata";
import { KEY_METADATA_NAME } from "./decorator";

export interface ICustomPropertyInfo {
  key: string,
  default: any,
  optional: boolean,
}

export interface IPropertyInfo extends ICustomPropertyInfo {
  propertyName: string,
  propertyType: any,
}

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getAllPropertyInfo(target: TConfig): IPropertyInfo[];
}

export class ConfigReflector<TConfig> implements IConfigReflector<TConfig> {
  constructor(private readonly _ctor: { new(): TConfig }) {}

  public create(): TConfig {
    return new this._ctor();
  }

  public getAllPropertyInfo(target: TConfig): IPropertyInfo[] {
    const names = [
      ...Object.getOwnPropertyNames(target),
      ...Object.getOwnPropertyNames((target as any).__proto__ ?? {})
    ];

    return names
      .filter(key => this._hasMetadata(target, key))
      .map(key => this._getPropertyInfo(target, key))
    ;
  }

  private _getPropertyInfo(target: TConfig, propertyName: string): IPropertyInfo {
    const info: ICustomPropertyInfo = Reflect.getMetadata(
      KEY_METADATA_NAME,
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

  private _hasMetadata(target: TConfig, propertyKey: string) {
    return Reflect.hasMetadata(KEY_METADATA_NAME, target, propertyKey);
  }
}
