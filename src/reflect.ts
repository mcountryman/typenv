
export const EnvProperty = (envName: string, defaultValue: any) => {};

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getEnvName(propertyName: string): string;
  getEnvNames(): [string, string][];
}

export class ConfigReflector<TConfig> implements IConfigReflector<TConfig> {
  constructor(private readonly _ctor: { new(): TConfig }) {}

  public create(): TConfig {
    return new this._ctor();
  }

  public getEnvName(propertyName: string): string { return ""; }
  public getEnvNames(): [string, string][] { return []; }
}
