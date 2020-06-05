import { IConfigReflector } from "../../reflect";

interface IDriverContext<TConfig> {
  target: any;
  reflector: IConfigReflector,
}

export class EnvDriver<TConfig> {
  constructor(private readonly _env: { [index: string]: string } = process.env) {}

  public populate(context: IDriverContext<TConfig>) {
    for (let prop of context.reflector.getAllMetadata()) {
      context.target[prop.propertyName] = this._env[prop.key];
    }
  }
}
