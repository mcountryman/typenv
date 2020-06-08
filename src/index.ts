import { createLoader, IConfigLoader, ILoaderOptions } from "./loader";
import { Reflector } from "./reflector";

export * from "./loader";
export * from "./reflector";
export * from "./decorator";

/**
 * Load configuration from supplied class
 *
 * @remarks
 * Load method is dependant on `loader.type`
 *
 * @example
 * ```ts
 * class MyConfig {
 *   @Key("KEY_NAME")
 *   public property: string;
 * }
 *
 * await load(MyConfig);
 * ```
 *
 * @param klass     Class
 * @param options   Config options
 * @param loader    Config loader (defaults to loader created by @link createLoader)
 * @param reflector Config reflector (defaults to @link Reflector)
 */
export const load = async <TConfig>(
  klass: new () => TConfig,
  options: ILoaderOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(klass)
): Promise<TConfig> => {
  await loader.load(reflector);
  return reflector.target;
};

export const loadSync = <TConfig>(
  ctor: new () => TConfig,
  options: ILoaderOptions = { type: "dotenv" },
  loader: IConfigLoader = createLoader(options),
  reflector = new Reflector(ctor)
): TConfig => {
  loader.loadSync(reflector);
  return reflector.target;
};
