import { IConfigLoader } from "../../loader";
import { Reflector, IMetadata } from "../../reflector";
import { DotEnvParser } from "./parser";
import { join } from "path";
import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import { IDotEnvLoaderOptions } from "./options";
import { ValueParser } from "./value_parser";

export class DotEnvLoader implements IConfigLoader {
  constructor(
    private readonly _options: IDotEnvLoaderOptions,

    private readonly _env: { [index: string]: string } = process.env,
    private readonly _envPath: string = join(process.cwd(), ".env"),
    private readonly _envParser = new DotEnvParser(),
    private readonly _valueParser = new ValueParser()
  ) {}

  public async load(reflector: Reflector) {
    this.loadFromValues(reflector, await this.getValues());
  }

  public loadSync(reflector: Reflector) {
    this.loadFromValues(reflector, this.getValuesSync());
  }

  /**
   * Parse .env configuration into object
   */
  public async getValues(): Promise<any> {
    try {
      const content = await readFile(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required) throw ex;
    }

    return {};
  }

  /**
   * Parse .env configuration into object synchronously
   */
  public getValuesSync(): any {
    try {
      const content = readFileSync(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required) throw ex;
    }

    return {};
  }

  /**
   * Iterate over metadata properties and assign values from environment
   * @param reflector
   * @param values
   */
  private loadFromValues(reflector: Reflector, values: any) {
    for (const meta of reflector.getAllMetadata()) {
      const value = values[meta.key] ?? this._env[meta.key];

      if (value !== undefined)
        reflector.setProperty(meta, this._valueParser.parse(meta, value));
    }
  }
}
