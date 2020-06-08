import { fs, vol } from "memfs";

jest.mock("fs", () => fs);
jest.mock("fs/promises", () => fs.promises);
import { DotEnvLoader } from "./loader";

describe("DotEnvLoader", () => {
  it("Should throw if required on load", async () => {
    vol.fromJSON({});

    const loader = new DotEnvLoader({
      type: "dotenv",
      required: true,
    });

    await expect(loader.getValues()).rejects.toThrow();
    expect(() => loader.getValuesSync()).toThrow();
  });

  it("Shouldn't throw if not required on load", async () => {
    vol.fromJSON({});

    const loader = new DotEnvLoader({
      type: "dotenv",
      required: false,
    });

    await expect(loader.getValues()).resolves.toStrictEqual({});
    expect(() => loader.getValuesSync()).not.toThrow();
  });
  /*
  public async getValues(): Promise<any> {
    try {
      const content = await readFile(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required) throw ex;
    }

    return {};
  }

  public getValuesSync(): any {
    try {
      const content = readFileSync(this._envPath, "utf8");
      return this._envParser.parse(content);
    } catch (ex) {
      if (this._options.required) throw ex;
    }

    return {};
  }
  */
});
