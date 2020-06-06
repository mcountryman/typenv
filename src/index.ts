import { createLoader, IConfigLoader, LoaderOptions } from "./loader";
import { Reflector } from "./reflector";
import { Key } from "./decorator";

export * from "./loader";
export * from "./reflector";
export * from "./decorator";

export interface IConfigOptions extends LoaderOptions {}

class Test {
  @Key("test")
  public test: Date;
}

export const load = async <TConfig>(
  ctor: { new (): TConfig },
  options: IConfigOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(ctor)
): Promise<TConfig> => {
  await loader.load(reflector);
  return reflector.target;
};

export const loadSync = <TConfig>(
  ctor: { new (): TConfig },
  options: IConfigOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(ctor)
): TConfig => {
  loader.loadSync(reflector);
  return reflector.target;
};
