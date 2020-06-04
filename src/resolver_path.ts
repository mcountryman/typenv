
export interface IConfigPathResolverOptions {}

export interface IConfigPathResolver {
  tryResolve(): [boolean, string];
}

export class ConfigPathResolver implements IConfigPathResolver {
  constructor(private readonly _options: IConfigPathResolverOptions) {}

  public tryResolve(): [boolean, string] {
    throw new Error("Not implemented");
  }
}
