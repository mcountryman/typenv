import { KEY_METADATA_NAME } from "../decorator";
import { IConfigReflector, ICustomMetadata, IMetadata } from "../reflect";

export class ConfigReflector<TConfig> implements IConfigReflector {
  public get target(): any {
    return this._target;
  }

  constructor(
    ctor: { new(): TConfig },
    private readonly _target: TConfig = new ctor(),
  ) {}

  public getProperties(): string[] {
    return [
      ...Object.getOwnPropertyNames(this._target),
      ...Object.getOwnPropertyNames((this._target as any).__proto__ ?? {})
    ].filter(key => this._hasMetadata(this._target, key));
  }

  public setProperty<TValue = any>(propertyName: string, value: TValue) {
    this._target[propertyName] = value;
  }

  public getMetadata(propertyName: string): IMetadata {
    const info: ICustomMetadata = Reflect.getMetadata(
      KEY_METADATA_NAME,
      this._target,
      propertyName,
    );

    const propertyType: any = Reflect.getMetadata(
      "design:type",
      this._target,
      propertyName,
    );

    return {
      ...info,
      propertyType,
      propertyName,
    }
  }

  public getAllMetadata(): IMetadata[] {
    return this
      .getProperties()
      .map(key => this.getMetadata(key));
  }

  private _hasMetadata(target: TConfig, propertyKey: string) {
    return Reflect.hasMetadata(KEY_METADATA_NAME, target, propertyKey);
  }
}
