import { IReflector } from "./reflector";
import { IDotEnvLoaderOptions } from "./loaders/dotenv/options";

export type LoaderOptions = IDotEnvLoaderOptions;

export interface IConfigLoader {
  load(reflector: IReflector): Promise<void>;
  loadSync(reflector: IReflector): void;
}

export const createLoader = (options: LoaderOptions): IConfigLoader => {
  switch (options.type) {
    case "dotenv":
      return new (require("./loaders/dotenv/loader").DotEnvLoader)(options);
    default:
      throw new Error();
  }
};
