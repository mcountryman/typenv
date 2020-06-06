import { createLoader, IConfigLoader, LoaderOptions } from "./loader";
import { IReflector, Reflector } from "./reflector";

export * from "./loader";
export * from "./reflector";
export * from "./decorator";

export interface IConfigOptions extends LoaderOptions {}

export const load = async <TConfig>(
  ctor: { new (): TConfig },
  options: IConfigOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector: IReflector = new Reflector(ctor)
): Promise<TConfig> => {
  await loader.load(reflector);
  return reflector.target;
};

export const loadSync = <TConfig>(
  ctor: { new (): TConfig },
  options: IConfigOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector: IReflector = new Reflector(ctor)
): TConfig => {
  loader.loadSync(reflector);
  return reflector.target;
};
