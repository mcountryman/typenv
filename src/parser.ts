
export interface IConfigParserOptions {}

export interface IConfigParser {
  parse(content: string): void;
}

export class ConfigParser implements IConfigParser {
  constructor(private readonly _options: IConfigParserOptions) {
  }

  public parse(content: string): void {
    throw new Error("Not implemented");
  }
}
