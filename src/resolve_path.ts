import { join, normalize } from "path";
import { stat } from "fs/promises";
import { statSync, Stats, PathLike } from "fs";

/**
 * Config file path resolver
 */
export interface IConfigPathResolver {
  /**
   * Attempt to resolve config file
   * @returns [hasSuccessfullyResolvedPath, path]
   */
  tryResolve(): Promise<[boolean, string]>;

  /**
   * Attempt to resolve config file synchronously
   * @returns [hasSuccessfullyResolvedPath, path]
   */
  tryResolveSync(): [boolean, string];
}

export class ConfigPathResolver implements IConfigPathResolver {
  /**
   * @param _name      Target file name
   * @param _dirname   Base directory to start search
   * @param _maxLevels Maximum number of parent directories to search starting at _dirname
   * @param _stat      File stat function
   * @param _statSync  Synchronous file stat function
   */
  constructor(
    private readonly _name: string = ".env",
    private readonly _dirname: string = __dirname,
    private readonly _maxLevels: number = 10,
    private readonly _stat: (path: PathLike) => Promise<Stats> = stat,
    private readonly _statSync: (path: PathLike) => Stats = statSync,
  ) {}

  /**
   * Attempt to resolve config file
   * @returns [hasSuccessfullyResolvedPath, path]
   */
  public async tryResolve(): Promise<[boolean, string]> {
    for (let i = 0; i < this._maxLevels; i++) {
      const result = await this.getHasFile(i);
      if (result[0])
        return result;
    }

    return [false, ""];
  }

  /**
   * Attempt to resolve config file synchronously
   * @returns [hasSuccessfullyResolvedPath, path]
   */
  public tryResolveSync(): [boolean, string] {
    for (let i = 0; i < this._maxLevels; i++) {
      const result = this.getHasFileSync(i);
      if (result[0])
        return result;
    }

    return [false, ""];
  }

  /**
   * Attempts to find path at n levels above `this._dirname`
   * @param levels Number of levels above _dirname
   * @returns [pathExists, path]
   */
  public async getHasFile(levels: number): Promise<[boolean, string]> {
    const elevate = "../".repeat(levels).slice(0, -1);
    const path = join(this._dirname, elevate, this._name);

    try {
      const stat = await this._stat(path);

      return [
        stat.isFile(),
        normalize(path),
      ];
    } catch (ex) {
      return [false, ""];
    }
  }

  /**
   * Attempts to find path at n levels above `this._dirname`
   * @param levels Number of levels above _dirname
   * @returns [pathExists, path]
   */
  public getHasFileSync(levels: number): [boolean, string] {
    const elevate = "../".repeat(levels).slice(0, -1);
    const path = join(this._dirname, elevate, this._name);

    try {
      return [
        this._statSync(path).isFile(),
        normalize(path),
      ];
    } catch (ex) {
      return [false, ""];
    }
  }
}
