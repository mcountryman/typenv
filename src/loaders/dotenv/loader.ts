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
    const content = await readFile(this._envPath, "utf8");
    const values = this._envParser.parse(content);

    this._loadFromValues(reflector, values);
  }

  public loadSync(reflector: IReflector) {
    const content = readFileSync(this._envPath, "utf8");
    const values = this._envParser.parse(content);

    this._loadFromValues(reflector, values);
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
