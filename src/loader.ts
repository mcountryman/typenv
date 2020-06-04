export interface IConfigLoader {
  load(fileName: string): Promise<string>;
  loadSync(fileName: string): string;
}

export class ConfigLoader implements IConfigLoader {
  constructor() {}

  public async load(fileName: string): Promise<string> {
    throw new Error("Not implemented");
  }

  public loadSync(fileName: string): string {
    throw new Error("Not implemented");
  }
}
