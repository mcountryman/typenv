import { DotEnvParser } from "./parser";

describe("DotEnvParser", () => {
  it("Should parse .env file", () => {
    const content = `
      # This is a comment
      
      test1 = value
      test2=value
      test3 =   value
      
      # This is also a comment
    `;

    const parser = new DotEnvParser();
    const result = parser.parse(content);

    expect(result).toStrictEqual({
      test1: "value",
      test2: "value",
      test3: "value",
    });
  });
});
