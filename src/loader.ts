import { Reflector } from "./reflector";
import { IDotEnvLoaderOptions } from "./loaders/dotenv/options";

type LoaderOptions = IDotEnvLoaderOptions;
type LoaderType = LoaderOptions["type"];

export interface ILoaderOptions extends LoaderOptions {
  type: LoaderType;
}

export interface IConfigLoader {
  load(reflector: Reflector): Promise<void>;
  loadSync(reflector: Reflector): void;
}

export const createLoader = (options: LoaderOptions): IConfigLoader => {
  switch (options.type) {
    case "dotenv":
      return new (require("./loaders/dotenv/loader").DotEnvLoader)(options);
    default:
      throw new Error();
  }
};
