
export interface IEnvResolver {
  tryGetValue(name: string, typeName: string): [boolean, any];
}

export class EnvResolver implements IEnvResolver {
  constructor(private readonly _env: { [index: string]: any } = process.env) {}

  public tryGetValue(name: string, typeName: string): [boolean, any] {
    switch (typeName) {
      case "number": return this.getNumber(name);
      case "string": return this.getString(name);
      case "boolean": return this.getBoolean(name);
      default: return this.getJson(name);
    }
  }

  public getJson(name: string): [boolean, any] {
    const value = this._env[name];

    if (value === undefined)
      return [false, null];

    if (typeof value === "string")
      return [true, JSON.parse(value)];

    return [true, value];
  }

  public getNumber(name: string): [boolean, number] {
    const value = this._env[name];

    if (value === undefined)
      return [false, null];

    return [true, parseFloat(value)];
  }

  public getString(name: string): [boolean, string] {
    const value = this._env[name];

    if (value === undefined)
      return [false, null];

    return [true, String(value)];
  }

  public getBoolean(name: string): [boolean, boolean] {
    const value = this._env[name];

    if (value === undefined)
      return [false, null];

    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower.startsWith("t") || lower.startsWith("y"))
        return [true, true];

      return [true, false];
    }

    return [true, !!value];
  }
}
