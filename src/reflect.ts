
export const EnvProperty = (envName: string, defaultValue: any) => {};

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getEnvName(obj: TConfig, propertyName: string): string;
  getEnvNames(obj: TConfig): [string, string][];
}

export class ConfigReflector<TConfig> implements IConfigReflector<TConfig> {
  constructor(private readonly _ctor: { new(): TConfig }) {}

  public create(): TConfig {
    return new this._ctor();
  }

  public getEnvName(obj: TConfig, propertyName: string): string { throw new Error("Not implemented"); }
  public getEnvNames(obj: TConfig): [string, string][] { throw new Error("Not implemented"); }
}
