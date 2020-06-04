import { ConfigProperty, ConfigReflector } from "./reflect";

class TestConfig {
  @ConfigProperty("STRING", "value")
  public string: string;
  @ConfigProperty("NUMBER", 420.69)
  public number: number;
  @ConfigProperty("BOOLEAN", true)
  public boolean: boolean;
}

describe("ConfigReflector", () => {
  it("Should reflect property info", () => {
    const reflector = new ConfigReflector(TestConfig);
    const target = reflector.create();

    const stringInfo = reflector.getPropertyInfo(target, "string");

    expect(stringInfo.name).toBe("STRING");
    expect(stringInfo.default).toBe("value");
    expect(stringInfo.optional).not.toBeTruthy();
    expect(stringInfo.propertyType).toBe(String);
    expect(stringInfo.propertyName).toBe("string");
  });

  it("Should reflect all property info", () => {
    const reflector = new ConfigReflector(TestConfig);
    const target = reflector.create();
    const expectedInfos = {
      "number": { name: "NUMBER", default: 420.69, propertyType: Number, },
      "string": { name: "STRING", default: "value", propertyType: String, },
      "boolean": { name: "BOOLEAN", default: true, propertyType: Boolean, },
    };

    for (let info of reflector.getAllPropertyInfo(target)) {
      const expected = expectedInfos[info.name];

      expect(info.name).toBe(expected.name);
      expect(info.default).toBe(expected.default);
      expect(info.propertyType).toBe(expected.propertyType);
    }
  });
});
