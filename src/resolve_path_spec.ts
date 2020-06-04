import { fs, vol } from "memfs";
jest.mock("fs", () => fs);
jest.mock("fs/promises", () => fs.promises);
import { ConfigPathResolver } from "./resolve_path";

describe("PathResolver", () => {
  vol.fromJSON({
    "./b/c/d/e": "",
    "./a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p": "",
    "./a/.env": "",
  });

  it("Should resolve config path", async () => {
    const resolve = new ConfigPathResolver(".env", "a/b/c");
    const [hasPath, path] = await resolve.tryResolve();
    const [hasPathSync, pathSync] = resolve.tryResolveSync();

    expect(hasPath).toBeTruthy();
    expect(path).toBe("a/.env");
    expect(hasPathSync).toBeTruthy();
    expect(pathSync).toBe("a/.env");
  });

  it("Should fail to resolve path from 10 levels deep", async () => {
    const badDepthResolver = new ConfigPathResolver(
      ".env",
      "a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p"
    );

    const [hasPath, path] = await badDepthResolver.tryResolve();
    expect(hasPath).not.toBeTruthy();
  });

  it("Should fail to resolve path when not exists in parent", async () => {
    const badRootResolver = new ConfigPathResolver(
      ".env",
      "b/c/d/e"
    );

    const [hasPath, path] = await badRootResolver.tryResolve();
    expect(hasPath).not.toBeTruthy();
  });
});
