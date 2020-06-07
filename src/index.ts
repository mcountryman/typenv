import { createLoader, IConfigLoader, LoaderOptions } from "./loader";
import { Reflector } from "./reflector";

export * from "./loader";
export * from "./reflector";
export * from "./decorator";

export const load = async <TConfig>(
  ctor: new () => TConfig,
  options: LoaderOptions = {type: "dotenv"},
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(ctor)
): Promise<TConfig> => {
  await loader.load(reflector);
  return reflector.target;
};

export const loadSync = <TConfig>(
  ctor: new () => TConfig,
  options: LoaderOptions = {type: "dotenv"},
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(ctor)
): TConfig => {
  loader.loadSync(reflector);
  return reflector.target;
};
