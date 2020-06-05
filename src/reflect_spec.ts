import { ConfigReflector } from "./reflect";
import { Key } from "./decorator";

class TestConfig {
  @Key("STRING", "value")
  public string: string;
  @Key("NUMBER", 420.69)
  public number: number;
  @Key("BOOLEAN", true)
  public boolean: boolean;
}

describe("ConfigReflector", () => {
  it("Should reflect all property info", () => {
    const reflector = new ConfigReflector(TestConfig);
    const target = reflector.create();
    const expectedInfos = {
      "number": { name: "NUMBER", default: 420.69, propertyType: Number, },
      "string": { name: "STRING", default: "value", propertyType: String, },
      "boolean": { name: "BOOLEAN", default: true, propertyType: Boolean, },
    };

    for (let info of reflector.getAllPropertyInfo(target)) {
      const expected = expectedInfos[info.propertyName];

      expect(info.key).toBe(expected.name);
      expect(info.default).toBe(expected.default);
      expect(info.propertyType).toBe(expected.propertyType);
    }
  });
});
