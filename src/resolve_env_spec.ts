import { EnvResolver } from "./resolve_env";

describe("EnvResolver", () => {
  it
    .each([
      { in: "yes", type: Boolean, expected: true },
      { in: "true", type: Boolean, expected: true },
      { in: "false", type: Boolean, expected: false },
      { in: "test", type: String, expected: "test" },
      { in: "420.69", type: Number, expected: 420.69 },
      { in: "[420.69]", type: null, expected: [420.69] },
    ])
    ("Should resolve values", test => {
      const name = "ENV_NAME";
      const resolver = new EnvResolver({ [name]: test.in });
      const [hasResult, result] = resolver.tryGetValue(name, test.type);

      expect(hasResult).toBeTruthy();
      expect(result).toStrictEqual(test.expected);
    });
});
