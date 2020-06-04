import { DotEnvParser } from "./dotenv";

describe("DotEnvParser", () => {
  it("Should parse .env file", () => {
    const content = `
      # This is a comment
      
      test1 = value
      test2=value
      test3 =   value
      
      # This is also a comment
    `;

    const parser = new DotEnvParser(content);
    const result = parser.parse();

    expect(result).toStrictEqual({
      test1: "value",
      test2: "value",
      test3: "value",
    });
  });
});
