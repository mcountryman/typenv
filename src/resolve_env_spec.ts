import { EnvResolver } from "./resolve_env";

describe("EnvResolver", () => {
  it
    .each([
      { in: "yes", type: "boolean", expected: true },
      { in: "true", type: "boolean", expected: true },
      { in: "false", type: "boolean", expected: false },
      { in: "test", type: "string", expected: "test" },
      { in: "420.69", type: "number", expected: 420.69 },
      { in: "[420.69]", type: "any", expected: [420.69] },
    ])
    ("Should resolve values", test => {
      const name = "ENV_NAME";
      const resolver = new EnvResolver({ [name]: test.in });
      const [hasResult, result] = resolver.tryGetValue(name, test.type);

      expect(hasResult).toBeTruthy();
      expect(result).toStrictEqual(test.expected);
    });
});
