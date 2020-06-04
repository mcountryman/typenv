import { ConfigLoader, IConfigLoader } from "./loader";
import { ConfigParser, IConfigParser, IConfigParserOptions } from "./parser";
import {
  ConfigPathResolver,
  IConfigPathResolver,
  IConfigPathResolverOptions
} from "./resolver_path";
import { ConfigReflector, IConfigReflector } from "./reflect";
import { EnvResolver, IEnvResolver } from "./resolve_env";

export * from "./loader";
export * from "./parser";
export * from "./reflect";
export * from "./resolver_path";

export interface IConfigOptions extends
  IConfigParserOptions,
  IConfigPathResolverOptions {}

export const load = async <TConfig>(
  ctor: { new(): TConfig },
  options: IConfigOptions,
  loader: IConfigLoader = new ConfigLoader(),
  parser: IConfigParser = new ConfigParser(options),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
  pathResolver: IConfigPathResolver = new ConfigPathResolver(options),
): Promise<TConfig> => {

  const [hasPath, path] = pathResolver.tryResolve();
  if (hasPath) {
    parser.parse(await loader.load(path));
  }

  const obj = reflector.create();
  const props = reflector.getEnvNames(obj);

  for (let prop of props) {
    const type = "resolve type";
    obj[prop[1]] = envResolver.get(prop[0], type);
  }

  return obj;
};

export const loadSync = <TConfig>(
  ctor: { new(): TConfig },
  options: IConfigOptions,
  loader: IConfigLoader = new ConfigLoader(),
  parser: IConfigParser = new ConfigParser(options),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
  pathResolver: IConfigPathResolver = new ConfigPathResolver(options),
): TConfig => {
  throw new Error("Not implemented");
};
