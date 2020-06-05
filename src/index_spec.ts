import { fs, vol } from "memfs";
import { Key, loadSync } from "./index";

jest.mock("fs", () => fs);
jest.mock("fs/promises", () => fs.promises);

class CustomConfig {
  @Key("TEST_STRING")
  public string: string;
  @Key("TEST_NUMBER")
  public number?: number;
}

describe("typenv", () => {
  vol.fromJSON({
    "node_modules/typenv/dist/index.js": "...",
    ".env": `
      TEST_STRING=test
      TEST_NUMBER=420.69
    `,
  });

  it("Should load config",  () => {
    const config = loadSync(CustomConfig);

    expect(config.string).toBe("test");
    expect(config.number).toBe(420.69);
  });
});
