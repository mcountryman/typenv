import "reflect-metadata";
import { ICustomMetadata } from "./reflector";

export const KEY_METADATA_NAME = "typenv:key";

export interface IKeyOpts {
  key: string,
  default?: any,
  optional?: boolean,
}

export const Key = (opts: string | IKeyOpts) =>
  (target: any, propertyKey: string | symbol) => {
    if (typeof opts === "string")
      opts = { key: opts } as IKeyOpts;

    // Set default of type if not optional and defaultValue not supplied
    if (!opts.optional && !opts.default)
      opts.default = getDefaultValue(target, propertyKey, opts.default);

    // Apply default value to target
    setDefaultValue(target, propertyKey, opts.default);

    // Set metadata
    setMetadata(target, propertyKey, opts);
  }
;

function setMetadata(target: any, propertyKey: string | symbol, opts: IKeyOpts) {
  Reflect.defineMetadata(
    KEY_METADATA_NAME,
    {
      key: opts.key,
      default: opts.default,
      optional: opts.optional
    } as ICustomMetadata,
    target,
    propertyKey
  );
}

function getDefaultValue(
  target: any,
  propertyKey: string | symbol,
  defaultValue: any
): any {
  const type = Reflect.getMetadata("design:type", target, propertyKey);

  if (typeof type === "function") return defaultValue ?? type();
}

function setDefaultValue(
  target: any,
  propertyKey: string | symbol,
  defaultValue: any
) {
  if (!Object.getOwnPropertyDescriptor(target, propertyKey)) {
    Object.defineProperty(target, propertyKey, {
      value: defaultValue,
      writable: true,
    });
  }
}
