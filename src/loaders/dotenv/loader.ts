import { IConfigLoader } from "../../loader";
import { IReflector, IMetadata } from "../../reflector";
import { DotEnvParser } from "./parser";
import { join } from "path";
import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import { IDotEnvLoaderOptions } from "./options";

export class DotEnvLoader implements IConfigLoader {
  constructor(
    private readonly _options: IDotEnvLoaderOptions,

    private readonly _env: { [index: string]: string } = process.env,
    private readonly _envPath: string = join(process.cwd(), ".env"),
    private readonly _envParser: DotEnvParser = new DotEnvParser()
  ) {}

  public async load(reflector: IReflector) {
    this._loadFromValues(reflector, await this._getValues());
  }

  public loadSync(reflector: IReflector) {
    this._loadFromValues(reflector, this._getValuesSync());
  }

  private async _getValues(): Promise<any> {
    try {
      const content = await readFile(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required)
        throw ex;
    }

    return {};
  }

  private _getValuesSync(): any {
    try {
      const content = readFileSync(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required)
        throw ex;
    }

    return {};
  }

  private _loadFromValues(reflector: IReflector, values: any) {
    for (let meta of reflector.getAllMetadata()) {
      const value = values[meta.key] ?? this._env[meta.key];

      if (value !== undefined)
        this._setProperty(reflector, meta, value);
    }
  }

  private _setProperty(reflector: IReflector, meta: IMetadata, value: string) {
    reflector.setProperty(meta, value);
  }
}
