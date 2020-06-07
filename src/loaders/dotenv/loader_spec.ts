import { DotEnvLoader } from "./loader";
import { IMetadata } from "../../reflector";

describe("DotEnvLoader", () => {
  it("Should parse strings", () => {
    const loader = new DotEnvLoader({ type: "dotenv" });
    const meta: IMetadata = {
      key: "",
      default: null,
      optional: false,
      propertyName: "",
      propertyType: null,
    };

    const dateMeta = { ...meta, propertyType: Date };
    const stringMeta = { ...meta, propertyType: String };
    const numberMeta = { ...meta, propertyType: Number };
    const arrayMeta = { ...meta, propertyType: Array };
    const objectMeta = { ...meta, propertyType: Object };

    const stringActual = "string";
    const numberActual = 420.69;
    const arrayActual = [ stringActual, numberActual ];
    const objectActual = { stringActual, numberActual };

    const stringExpected = loader.getValue(stringMeta, stringActual.toString());
    const numberExpected = loader.getValue(numberMeta, numberActual.toString());
    const arrayExpected = loader.getValue(
      arrayMeta,
      JSON.stringify(arrayActual)
    );
    const objectExpected = loader.getValue(
      objectMeta,
      JSON.stringify(objectActual)
    );

    expect(stringActual).toBe(stringExpected);
    expect(numberActual).toBe(numberExpected);
    expect(arrayActual).toStrictEqual(arrayExpected);
    expect(objectExpected).toStrictEqual(objectExpected);
  });
});