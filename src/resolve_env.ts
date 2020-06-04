
export interface IEnvResolver {
  get(name: string, typeName: string): any;
}

export class EnvResolver implements IEnvResolver {
  public get(name: string, typeName: string): any {
    throw new Error("Not implemented");
  }

  public getBool(name: string): boolean {
    throw new Error("Not implemented");
  }

  public getNumber(name: string): number {
    throw new Error("Not implemented");
  }

  public getString(name: string): string {
    throw new Error("Not implemented");
  }
}
