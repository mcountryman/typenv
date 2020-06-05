import { ICustomMetadata, IMetadata } from "../metadata";
import { KEY_METADATA_NAME } from "../decorator";
import { IConfigReflector } from "../reflect";

export class ConfigReflector<TConfig> implements IConfigReflector<TConfig> {
  constructor(private readonly _ctor: { new(): TConfig }) {}

  public create(): TConfig {
    return new this._ctor();
  }

  public getMetadata(target: TConfig): IMetadata[] {
    const names = [
      ...Object.getOwnPropertyNames(target),
      ...Object.getOwnPropertyNames((target as any).__proto__ ?? {})
    ];

    return names
      .filter(key => this._hasMetadata(target, key))
      .map(key => this._getPropertyInfo(target, key))
      ;
  }

  private _getPropertyInfo(target: TConfig, propertyName: string): IMetadata {
    const info: ICustomMetadata = Reflect.getMetadata(
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
