import { DotEnvParser } from "./impl/dotenv";

export interface IConfigParser {
  parse(content: string): void;
}

export class ConfigParser implements IConfigParser {
  public parse(content: string): void {
    return new DotEnvParser(content).parse();
  }
}
