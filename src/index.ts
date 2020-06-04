import { ConfigLoader, IConfigLoader } from "./loader";
import { ConfigParser, IConfigParser } from "./parser";
import { ConfigPathResolver, IConfigPathResolver } from "./resolve_path";
import { ConfigReflector, IConfigReflector } from "./reflect";
import { EnvResolver, IEnvResolver } from "./resolve_env";

export * from "./loader";
export * from "./parser";
export * from "./reflect";
export * from "./resolve_path";

export interface IConfigOptions {}

export const load = async <TConfig>(
  ctor: { new(): TConfig },
  options: IConfigOptions,
  loader: IConfigLoader = new ConfigLoader(),
  parser: IConfigParser = new ConfigParser(),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
  pathResolver: IConfigPathResolver = new ConfigPathResolver(),
): Promise<TConfig> => {

  const [hasPath, path] = await pathResolver.tryResolve();
  if (hasPath) {
    parser.parse(await loader.load(path));
  }

  const obj = reflector.create();
  const props = reflector.getEnvNames(obj);

  for (let prop of props) {
    const type = "resolve type";
    obj[prop[1]] = envResolver.tryGetValue(prop[0], type);
  }

  return obj;
};

export const loadSync = <TConfig>(
  ctor: { new(): TConfig },
  options: IConfigOptions,
  loader: IConfigLoader = new ConfigLoader(),
  parser: IConfigParser = new ConfigParser(),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
  pathResolver: IConfigPathResolver = new ConfigPathResolver(),
): TConfig => {
  throw new Error("Not implemented");
};
