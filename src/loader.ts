import { readFile } from "fs/promises";
import { readFileSync } from "fs";

export interface IConfigLoader {
  load(fileName: string): Promise<string>;
  loadSync(fileName: string): string;
}

export class ConfigLoader implements IConfigLoader {
  constructor() {}

  public load(fileName: string) {
    return readFile(fileName, "utf8")
  };

  public loadSync(fileName: string): string {
    return readFileSync(fileName, "utf8");
  }
}
