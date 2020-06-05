import { DotEnvParser } from "./impl/dotenv";

export interface IConfigParser {
  parse(content: string): void;
}

export class ConfigParser implements IConfigParser {
  constructor(private readonly _map: { [index: string]: any } = process.env) {}

  public parse(content: string): void {
    const values = new DotEnvParser(content).parse();

    Object
      .keys(values)
      .forEach(key => this._map[key] = values[key])
    ;
  }
}
