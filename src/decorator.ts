import { ICustomPropertyInfo } from "./reflect";

export const KEY_METADATA_NAME = "typenv:key";

export const Key =
  (key: string, defaultValue: any = null, optional: boolean = false) =>
    (target: any, propertyKey: string | symbol) => {

      // Set default of type if not optional and defaultValue not supplied
      if (!optional && !defaultValue)
        defaultValue = getDefaultValue(target, propertyKey, defaultValue);

      // Apply default value to target
      setDefaultValue(target, propertyKey, defaultValue);

      // define metadata
      Reflect.defineMetadata(
        KEY_METADATA_NAME,
        { key, default: defaultValue, optional } as ICustomPropertyInfo,
        target,
        propertyKey,
      );
    };

function getDefaultValue(target: any, propertyKey: string | symbol, defaultValue: any): any {
  const type = Reflect.getMetadata(
    "design:type",
    target,
    propertyKey,
  );

  if (typeof type === "function")
    return defaultValue ?? type();
}

function setDefaultValue(target: any, propertyKey: string | symbol, defaultValue: any) {
  if (!Object.getOwnPropertyDescriptor(target, propertyKey)) {
    Object.defineProperty(
      target,
      propertyKey,
      {
        value: defaultValue,
        writable: true,
      },
    );
  }
}
