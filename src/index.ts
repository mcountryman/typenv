import { ConfigLoader, IConfigLoader } from "./loader";
import { ConfigParser, IConfigParser } from "./parser";
import { ConfigPathResolver, IConfigPathResolver } from "./resolve_path";
import { ConfigReflector, IConfigReflector } from "./reflect";
import { EnvResolver, IEnvResolver } from "./resolve_env";

export * from "./loader";
export * from "./parser";
export * from "./reflect";
export * from "./resolve_path";

export const load = async <TConfig>(
  ctor: { new(): TConfig },
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

  return loadConfig(
    ctor,
    parser,
    reflector,
    envResolver,
  );
};

export const loadSync = <TConfig>(
  ctor: { new(): TConfig },
  loader: IConfigLoader = new ConfigLoader(),
  parser: IConfigParser = new ConfigParser(),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
  pathResolver: IConfigPathResolver = new ConfigPathResolver(),
): TConfig => {

  const [hasPath, path] = pathResolver.tryResolveSync();
  if (hasPath) {
    parser.parse(loader.loadSync(path));
  }

  return loadConfig(
    ctor,
    parser,
    reflector,
    envResolver,
  );
};

function loadConfig<TConfig>(
  ctor: { new(): TConfig },
  parser: IConfigParser = new ConfigParser(),
  reflector: IConfigReflector<TConfig> = new ConfigReflector(ctor),
  envResolver: IEnvResolver = new EnvResolver(),
) {

  const obj = reflector.create();
  const infos = reflector.getAllPropertyInfo(obj);

  for (let info of infos) {
    const [hasValue, value] = envResolver.tryGetValue(info.name, info.propertyType);
    if (!hasValue) {
      if (!info.optional)
        throw new Error(`Missing config option ${info.name}`);

      continue;
    }

    obj[info.propertyName] = value;
  }

  return obj;
}
