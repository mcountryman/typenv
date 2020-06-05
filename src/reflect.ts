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

export const ConfigProperty =
  (name: string, defaultValue: any = null, optional: boolean = false) =>
    (target: any, propertyKey: string | symbol) => {
      if (!defaultValue && !optional) {
        const type = Reflect.getMetadata(
          "design:type",
          target,
          propertyKey,
        );

        if (type?.call)
          defaultValue = type();
      }

      if (!Object.getOwnPropertyDescriptor(target, propertyKey)) {
        Object.defineProperty(
          target,
          propertyKey,
          {
            value: defaultValue,
            writable: true,
          },
        );
      }

      Reflect.defineMetadata(
        CONFIG_PROPERTY_NAME,
        { name, default: defaultValue, optional } as ICustomPropertyInfo,
        target,
        propertyKey,
      );
    };

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

  private _hasMetadata(target: TConfig, propertyKey: string) {
    return Reflect.hasMetadata(CONFIG_PROPERTY_NAME, target, propertyKey);
  }
}
